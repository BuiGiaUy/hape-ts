import React from 'react'

export const getProductUrl = (product: {name: string, product_id: string}) => {
  let url = '/l/' + trimString(getSlug(product.name), 40) + '.' + product.product_id;
  return url
}
export const getSlug = (str: string) => {
  return str.trim().replace(/[&\/\\#”“!@$`’;,+()$~%.'':*^?<>{}]/g, '').replace(/\s/g, '-').replace('---', '-').replace('--','-').trim();
}
export const trimString = (string: string, length: number) => {
  string = filterChar(string)
  return string.length > length ? string.substring(0, length) : string
}
export const filterChar = (text: string) => {
  return text.replace(/&quot;/g, '"').replace(/&amp;/g, '&')
}
export const currencyFormat = (number: number) => {
    return (
      <span>
        <span>đ</span>
        {Number(number)
          .toFixed(0)
          .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")}
      </span>
    );
  };
  