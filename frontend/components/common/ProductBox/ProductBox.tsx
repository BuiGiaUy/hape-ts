import React, { FC } from "react";
import IProduct from "../../interfaces/product";
import ProductItem from "../ProductItem/ProductItem";

interface Props {
  title: string;
  products: any[];
}

const ProductBox: FC<Props> = ({ title, products }) => {
  return (
    <>
      {Array.isArray(products) && products.length > 0 && (
        <div className="">
          <div className="">
            <div className="">
              <h3>{title}</h3>

            </div>
          </div>
          <div className="">
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
