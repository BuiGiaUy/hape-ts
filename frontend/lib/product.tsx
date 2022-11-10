import React from 'react'


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
  