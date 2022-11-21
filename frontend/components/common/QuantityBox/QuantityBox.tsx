import React from "react";
import s from "./QuantityBox.module.css";
import { BiMinus, BiPlus } from "react-icons/bi";
type Props = {
  defaultQty: number;
  productID: string;
  onChange: (quantity: number, productID: string) => void;
};

const QuantityBox: React.FC<Props> = ({ defaultQty, productID, onChange }) => {
  const [quantity, setQuantity] = React.useState<number>(defaultQty);
  const update = (rqQuantity: number) => {
    setQuantity(rqQuantity);
    onChange(rqQuantity, productID);
  };

  return (
    <span className={s.root}>
      <button onClick={(e) => update(quantity - 1)}>
        <BiMinus />
      </button>
      <input
        type="text"
        value={quantity}
        onChange={(e: any) => update(e.target.value)}
      />
      <button onClick={(e) => update(quantity + 1)}>
        <BiPlus />
      </button>
    </span>
  );
};

export default QuantityBox;
