import Link from "next/link";
import React from "react";
import { useAuth } from "../../../context/AuthContext";
import {
  RiShoppingBag2Line,
  RiLogoutCircleLine,
  RiSettings5Line,
} from "react-icons/ri";
import { FaRegUserCircle } from "react-icons/fa";
const LoggedBox = () => {
  console.log("LoggedBox render...");
  const { user, logout, updateAction } = useAuth();
  const logoutSubmit = () => {
    updateAction({ event: "", payload: {} });
    logout();
  };
  return (
    <div className="">
      <div className="">
        <span
          className=""
          style={{ backgroundImage: `url(${user.avatar})` }}
        ></span>
        <div className="">
          <i className=""></i>
          <ul>
            <li className="">
              <Link href="/user/orders">
                <RiShoppingBag2Line />
                Đơn hàng
              </Link>
            </li>
            <li className="">
              <Link href="/user/address-book">
                <RiSettings5Line />
                Địa chỉ
              </Link>
            </li>
            <li className="">
              <Link href="/user/profile">
                <FaRegUserCircle />
                Tài Khoản
              </Link>
            </li>
            <li>
              <a>
                <RiLogoutCircleLine /> Đăng xuất
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LoggedBox;
