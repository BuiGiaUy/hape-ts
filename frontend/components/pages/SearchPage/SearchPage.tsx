import { Pagination } from "antd";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import React from "react";
import ProductItem from "../../common/ProductItem/ProductItem";
import s from "./SearchPage.module.css";

type Props = {
  products: any[];
  keyword: string;
  count: number;
  page?: number;
};
const PAGE_SIZE = 30;
const Empty = () => {
  return (
    <div className="my-5">
      <h3 className="text-xl text-gray-600 text-center">
        Không tìm thấy sản phẩm nào!
      </h3>
    </div>
  );
};

const SearchPage: React.FC<Props> = ({ products, keyword, count, page }) => {
  const router = useRouter();
  const onPageNumberChange = (pageRq) => {
    router.push({
      pathname: "/search",
      query: { keyword, page: pageRq },
    });
  };
  return (
    <main className="mt-24 category-page">
      <NextSeo title={"tìm kiếm: " + keyword} />
      <div className={s.root}>
        {keyword !== undefined && (
          <h1 className={s.pageTitle}>{"Tìm kiếm: " + keyword}</h1>
        )}
        {count === 0 && <Empty />}
        {products.length > 0 && (
          <div className="md:grid-cols-12 md:grid md:gap-6">
            <div className="md:col-span-12">
              {Array.isArray(products) && (
                <div>
                  <div className={s.productList}>
                    {products.map((product: any, key) => {
                      return (
                        <div className="col-span-1 " key={key}>
                          <ProductItem product={product} key={key} />
                        </div>
                      );
                    })}
                  </div>
                  <div className="text-center">
                    <Pagination
                      current={Number(page)}
                      onChange={onPageNumberChange}
                      showSizeChanger={false}
                      pageSize={PAGE_SIZE}
                      total={count}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default SearchPage;
