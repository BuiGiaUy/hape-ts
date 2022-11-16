import React, { FC } from "react";
import IProduct from "../../interfaces/product";
import ProductItem from "../ProductItem/ProductItem";
import s from "./ProductBox.module.css";
interface Props {
  title: string;
  products: any[];
}

const ProductBox: FC<Props> = ({ title, products }) => {
  return (
    <>
      {Array.isArray(products) && products.length > 0 && (
        <div className={s.root}>
          <div className="">
            <div className="text-center">
              <h3>{title}</h3>
            </div>
          </div>

          <div className="mx-2 grid grid-cols-2 md:grid-cols-6 gap-3 md:gap-6">
            {products.map((product: IProduct, key) => (
              <ProductItem product={product} key={key}></ProductItem>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default ProductBox;
