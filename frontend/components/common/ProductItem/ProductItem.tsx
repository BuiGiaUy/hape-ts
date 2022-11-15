import React, { FC } from "react";
import IProduct from "./../../interfaces/product";
import Link from "next/link";
import { currencyFormat, filterChar } from '../../../lib/product';

interface Props {
  product: IProduct;
}
const PriceDiscountInc1: FC<Props> = ({ product }) => {
  return (
    <div>
      <span className="">{currencyFormat(product.price)}</span>
      <span className="">{currencyFormat(product.regular_price)}</span>
    </div>
  );
};
const PriceOnly: FC<Props> = ({ product }) => {
  return (
    <div>
      <div className="">{currencyFormat(product.price)}</div>
    </div>
  );
};
const ProductItem: FC<Props> = ({ product }) => {
  const name = filterChar(product.name)
  return (
    <div className="">
      <div className="">
        <Link href="">
         
            <img src="" alt={name} width="200px" />
        </Link>
      </div>
      <div className="">
        <Link href="">{name}</Link>
      </div>

      {product.regular_price ? (
        <PriceDiscountInc1 product={product} />
      ) : (
        <PriceOnly product={product} />
      )}
    </div>
  );
};
export default ProductItem