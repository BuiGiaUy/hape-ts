import React from "react";
import s from "./ProductPage.module.css";
import cn from "classnames";
import IProduct from "../../interfaces/product";
import { useRouter } from "next/router";
import {
  allowedTags,
  filterChar,
  getProductUrl,
  renderCategoryBreadcrumb,
  strip_tags,
  trimString,
} from "../../../lib/product";
import { useAuth } from "../../../context/AuthContext";
import Error from "../../pages/Error/Error";
import { Carousel, message, Skeleton } from "antd";
import { NextSeo, ProductJsonLd } from "next-seo";
import { currencyFormat } from "../../../lib/product";
import QuantityBox from "../QuantityBox/QuantityBox";
import axios from "axios";
import { BiCart } from "react-icons/bi";
import { GiReturnArrow } from "react-icons/gi";
import { FaCertificate, FaShippingFast } from "react-icons/fa";
import ProductBox from "../ProductBox/ProductBox";
interface Props {
  product?: any;
  related?: { products: any[] };
  found?: boolean;
  isLoading?: boolean;
}
interface ProductInfoProps {
  product: IProduct;
}

const ProductPage: React.FC<Props> = ({
  product,
  related,
  found,
  isLoading = true,
}) => {
  const router = useRouter();
  const { accessToken, updateAction } = useAuth();
  const headerApi = {
    headers: { Authorization: `Bearer  ${accessToken}` },
  };

  const [quantity, setQuantity] = React.useState(1);

  const name = product ? filterChar(product.name) : "";
  const productID = product ? product.product_id : "";
  const addToCart = async (goto: string = "") => {
    try {
      let { data } = await axios.post(
        "/cart",
        {
          productID,
          quantity,
          action: "addToCart",
        },
        headerApi
      );
      if (data.status === 500) {
        message.error("Đây là sản phẩm trong shop của bạn.");
      } else {
        updateAction({ event: "CART_SUMMARY_UPDATE", payload: data });
        message.error("Đã thêm sản phẩm");
        if (goto !== "") {
          router.push("/checkout");
        }
      }
    } catch (error) {
      if (error?.response?.data) {
        if (error.response.data.StatusCode == 401) {
          updateAction({ event: "LOGIN_OPEN", payload: {} });
        }
      }
    }
  };
  const buyNow = async () => {
    await addToCart("checkout");
  };
  const changeQuantity = React.useCallback((number: number) => {
    setQuantity(number);
  }, []);
  return (
    <main className="mt-12 md:mt-20">
      {!isLoading && !found && <Error />}
      {isLoading && (
        <div className={s.boxWrap}>
          <LoadingBox />
        </div>
      )}
      {found && product && (
        <div className={s.boxWrap}>
          <SEO product={product} />
          <div className="mb-3">
            <div className={s.categoryMenu}>
              {renderCategoryBreadcrumb(product.categoryRaw)}
              <span className={s.productNameBreadcrumb}>{name}</span>
            </div>
          </div>
          <div className={s.productBox}>
            <div className="md:grid md:grid-cols-12 md:gap-12">
              <div className="md:col-span-5">
                <div className={s.galleryBox}>
                  <Carousel effect="fade">
                    {product.images.map((url: any, key: number) => {
                      return (
                        <div key={key}>
                          <img src={url} alt={product.name} />
                        </div>
                      );
                    })}
                  </Carousel>
                </div>
              </div>
              <div className="md:col-span-7">
                <h1 className={s.pageTitle}>{name}</h1>
                <div className={s.priceBox}>
                  {product.regular_price ? (
                    <PriceDiscountIncl product={product} />
                  ) : (
                    <PriceOnly product={product} />
                  )}
                </div>
                <div className={s.addToCartBox}>
                  <div className="my-5">
                    <span className={s.actionLabel}>Số Lượng:</span>
                    <QuantityBox
                      productID={product.id}
                      defaultQty={1}
                      onChange={changeQuantity}
                    />
                  </div>
                  <button onClick={buyNow} className={s.addNowButton}>
                    Mua Ngay
                  </button>
                  <button onClick={(e) => addToCart("")} className={s.addNowButton}>
                    <BiCart />
                    Thêm Giỏ Hàng
                  </button>
                </div>
                <PromoBox />
              </div>
            </div>
          </div>
          <div className={s.productBox}>
            <div className={s.contentTitle}>Mô Tả Sản phẩm {product.name}</div>
            <div
              className={cn("my-5 m-auto md:w-3/4", "content-description")}
              dangerouslySetInnerHTML={{
                __html: allowedTags(product.description),
              }}
            />
          </div>
          {Array.isArray(related) && (
            <ProductBox title="Sản phẩm tương tự" products={related}/>
          )}
        </div>
      )}
    </main>
  );
};

const PriceDiscountIncl: React.FC<ProductInfoProps> = ({ product }) => {
  return (
    <div>
      <span className={s.price}>{currencyFormat(product.price)}</span>
      <span className={s.priceOriginal}>{currencyFormat(product.regular_price)}</span>
    </div>
  );
};
const PriceOnly: React.FC<ProductInfoProps> = ({ product }) => {
  return (
    <div>
      <span className={s.price}>{currencyFormat(product.price)}</span>
    </div>
  );
};
const PromoBox: React.FC<any> = () => {
  return (
    <div className={s.promoBox}>
      <div className="md:grid md:grid-cols-3 md:gap-6">
        <div className="md:col-span-1">
          <GiReturnArrow />
          <label>7 ngày miễn phí trả hàng</label>
        </div>
        <div className="md:col-span-1">
          <FaCertificate />
          <label>Hàng chính hãng 100%</label>
        </div>
        <div className="md:col-span-1">
          <FaShippingFast />
          <label>Miễn phí vận chuyển</label>
        </div>
      </div>
    </div>
  );
};
const LoadingBox = () => {
  return (
    <div className={s.loadingBox}>
      <Skeleton />
    </div>
  );
};
const SEO: React.FC<{ product: any }> = ({ product }) => {
  const product_name = trimString(product.name, 65);
  const description = trimString(strip_tags(product.description, ""), 160);
  const url = process.env.NEXT_PUBLIC_SITE_URL + getProductUrl(product);
  return (
    <>
      <NextSeo
        title={product_name}
        description={description}
        openGraph={{
          type: "website",
          url,
          title: product_name,
          description: description,
          images: [
            {
              url: product.images[0],
              width: 1000,
              height: 1000,
              alt: product_name,
            },
          ],
        }}
      />
      <ProductJsonLd
        productName={product_name}
        images={product.images}
        description={description}
        sku={product.sku}
        aggregateRating={{
          ratingValue: "0.0",
          reviewCount: "0",
          bestRating: "0",
          ratingCount: "0",
        }}
        offers={[
          {
            price: product.price,
            priceCurrency: "VND",
            priceValidUntil: "2021-12-30",
            itemCondition: "http://schema.org/UsedCondition",
            availability: "http://schema.org/InStock",
            // url: 'https://www.example.com/executive-anvil',
            seller: {
              name: "HavaMall",
            },
          },
        ]}
      />
    </>
  );
};

export default ProductPage;
