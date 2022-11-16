import React, { FC } from "react";
import IProduct from "./../../interfaces/product";
import Link from "next/link";
import { currencyFormat, filterChar } from '../../../lib/product';
import s from "./ProductItem.module.css";
import cn  from "classnames";
import { getProductUrl } from './../../../lib/product';

interface Props {
  product: IProduct;
}
const PriceDiscountInc1: FC<Props> = ({ product }) => {
  return (
    <div>
      <span className={s.price}>{currencyFormat(product.price)}</span>
      <span className={s.priceOriginal}>{currencyFormat(product.regular_price)}</span>
    </div>
  );
};
const PriceOnly: FC<Props> = ({ product }) => {
  return (
    <div>
      <div className={s.price}>{currencyFormat(product.price)}</div>
    </div>
  );
};
const ProductItem: FC<Props> = ({ product }) => {
  const name = filterChar(product.name)
  return (
    <div className={cn(s.root,'product-item')}>
      <div className={s.image}>
        <Link href={getProductUrl(product)}>
            <img src={product.images[0]} alt={name} width="200px" />
        </Link>
      </div>
      <div className={s.name}>
        <Link href={getProductUrl(product)}>{name}</Link>
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