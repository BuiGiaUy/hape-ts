/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { SearchService } from 'src/search/search.service';
import { CategoriesService } from './categories.service';

const ES_INDEX_NAME = 'products';
const CDN = 'https://' + process.env.AWS_CLOUDFRONT + '/';

@Injectable()
export class ProductsService {
  constructor(
    readonly esService: SearchService,
    readonly categoriesService: CategoriesService,
    readonly filesService: FilesService,
  ) {}
  async getByUserID(userID: number, size: number, from: number) {
    const {
      body: {
        hits: { total, hits },
      },
    } = await this.esService.findBySingleField(ES_INDEX_NAME, { userID });
    const count = total.value;
    let products = [];
    if (count) {
      products = hits.map((item: any) => {
        return {
          id: item._id,
          ...item._source,
        };
      });
    }
    return {
      count,
      size,
      from,
      products,
    };
  }
  applyCDN(files: string[]) {
    const newFiles = [];
    for (const url of files) {
      //let remove this file
      const urlSplit = url.split('.amazonaws.com/');
      if (urlSplit.length >= 2) {
        const Key = urlSplit[1];
        newFiles.push(CDN + Key);
      }
    }
    return newFiles;
  }
  async getByMultiFields({
    must,
    size = 12,
    from = 0,
    sort = [{ createdAt: 'desc' }],
  }) {
    try {
      const {
        body: {
          hits: { total, hits },
        },
      } = await this.esService.findByMultiFields({
        index: ES_INDEX_NAME,
        must,
        _source: [
          'name',
          'sku',
          'images',
          'price',
          'regular_price',
          'sale_price',
          'quantity',
        ],
        size,
        from,
        sort,
      });
      const count = total.value;
      let products = [];
      if (count) {
        products = hits.map((item: any) => {
          return {
            id: item._id,
            ...item._source,
            images: this.applyCDN(item._source.images),
          };
        });
      }
      return {
        count,
        size,
        from,
        products,
      };
    } catch (err) {
      console.log('getByMultiFields: ', err);
    }
  }
  async searchByKeyword(keyword, size, from) {
    let count = 0;
    let products = [];
    try {
      const body = {
        size,
        from,
        query: {
          bool: {
            must: [
              {
                query_string: {
                  fields: ['name', 'tags.*'],
                  query: '*' + keyword + '*',
                  analyze_wildcard: true,
                },
              },
              {
                match: {
                  status: true,
                },
              },
            ],
          },
        },
        _source: [
          'name',
          'sku',
          'images',
          'price',
          'product_id',
          'regular_price',
          'sale_price',
          'quantity',
        ],
      };
      const {
        body: {
          hits: { total, hits },
        },
      } = await this.esService.search(ES_INDEX_NAME, body);
      count = total.value;

      if (count) {
        products = hits.map((item: any) => {
          return {
            id: item._id,
            ...item._source,
          };
        });
      }
    } catch (err) {}
    return {
      count,
      size,
      from,
      products,
    };
  }
  async create(userID: string, productDto: any) {
    try {
      const now = new Date();
      const createdAt = now.toISOString();
      const existing = await this.isSkuExisting(userID, productDto.sku);
      if (existing !== false) {
        return {
          status: false,
          message: 'this SKU is existing.',
        };
      }
      //move file from waiting to Production folder
      productDto.images = await this.filesService.formalizeS3Files(
        productDto.images,
      );
      //filter the un-control tag on description
      productDto.description = this.allowedTags(productDto.description);
      //collect category ID and his parents
      let categories = [];
      if (productDto.category) {
        categories = await this.collectGroupCategory(productDto.category);
      }
      // apply discount price
      const price = productDto.sale_price
        ? productDto.sale_price
        : productDto.regular_price;
      //get unique ID
      const product_id = await this.getUniqueID();
      const record: any = [
        { index: { _index: ES_INDEX_NAME } },
        {
          ...productDto,
          price,
          product_id,
          userID,
          categories,
          updatedAt: createdAt,
          createdAt,
        },
      ];
      const {
        body: { items },
      } = await this.esService.createByBulk(ES_INDEX_NAME);
      const productID = items[0].index._id;
      const { _source } = await this.esService.findById(
        ES_INDEX_NAME,
        productID,
      );
      const categoryRaw = await this.categoriesService.get(_source.category);
      return {
        product: { ..._source, id: productID },
        categoryRaw,
        status: true,
      };
    } catch (err) {
      console.log('Create Product:', err);
      return {
        product: null,
        status: false,
      };
    }
  }
}
