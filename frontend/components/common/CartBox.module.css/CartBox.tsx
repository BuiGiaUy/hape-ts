import React from "react";
import cn from "classnames";
import s from "./CartBox.module.css";
import { AiOutlineShop } from "react-icons/ai";
import { useAuth } from "../../../context/AuthContext";
import Router from "next/router";
import {
  RiFileList2Line,
  RiPlayListAddFill,
  RiShoppingCartLine,
} from "react-icons/ri";
import { FcAcceptDatabase } from "react-icons/fc";
import Link from "next/link";
type Props = {};

const CartBox: React.FC<Props> = () => {
  const {
    accessToken,
    action: { event, payload },
    updateAction,
  } = useAuth();
  const onClick = () => {
    if (accessToken === undefined || accessToken === "") {
      updateAction({ event: "LOGIN_OPEN", payload: {} });
    } else {
      Router.push("/cart");
    }
  };
  const onClickPost = () => {
    if (accessToken === undefined || accessToken === "") {
      updateAction({ event: "LOGIN_OPEN", payload: {} });
    } else {
      Router.push("/user/shop-product-form");
    }
  };
  return (
    <>
      <span onClick={onClickPost} className={cn(s.shop, "user-logged-box")}>
        <AiOutlineShop />
        <div className={cn("user-menu-dropdown", "mt-1")}>
          <i
            className="header-popover-arrow"
            style={{ transform: `translate(0px, 0px)`, left: `35px` }}
          ></i>
          <ul>
            <li className="menu-item">
              {accessToken ? (
                <Link href="/user/shop-product-form">
                  <a>
                    <RiPlayListAddFill />
                    Tạo sản phẩm
                  </a>
                </Link>
              ) : (
                <a>
                  <RiPlayListAddFill />
                  Tạo sản phẩm
                </a>
              )}
            </li>
            <li className="menu-item">
              {accessToken ? (
                <Link href="/user/shop-products">
                  <RiFileList2Line />
                  Sản phẩm
                </Link>
              ) : (
                <a>
                  <RiFileList2Line />
                  Sản phẩm
                </a>
              )}
            </li>
            <li className="menu-item">
              {accessToken ? (
                <Link href="/user/shop-orders">
                  <FcAcceptDatabase />
                  Quản lý đơn hàng
                </Link>
              ) : (
                <a>
                  <FcAcceptDatabase />
                  Quản lý đơn hàng
                </a>
              )}
            </li>
          </ul>
        </div>
      </span>
      <span onClick={onClick} className={s.cart}>
        <RiShoppingCartLine fill="none" />
        {event === "CART_SUMMARY_UPDATE" && payload.quantityTotal > 0 ? (
          <label>{payload.quantityTotal}</label>
        ) : (
          <></>
        )}
      </span>
    </>
  );
};

export default CartBox;
