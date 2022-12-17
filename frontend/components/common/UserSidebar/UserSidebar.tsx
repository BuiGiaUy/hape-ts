import Link from "next/link";
import React from "react";
import { FaAddressCard, FaMoneyCheck, FaUserCircle } from "react-icons/fa";
import { GiShoppingBag } from "react-icons/gi";
import { RiDatabase2Line, RiLockPasswordFill } from "react-icons/ri";
import s from "./UserSidebar.module.css";
import cn from "classnames";

interface Props {
  pid: string | string[];
}
interface PropsMenu {
  subMenu: string;
  title: string;
  children: any;
  pid: string | string[];
}

const MenuItem: React.FC<PropsMenu> = ({ subMenu, title, pid, children }) => {
  return (
    <div className={cn("menu-item", { active: subMenu === pid ? true : false })}>
      <Link href={"/user/" + subMenu }>
        {children}
        {title}
      </Link>
    </div>
  );
};

const UserSidebar: React.FC<Props> = ({ pid }) => {
  return (
    <div className={cn(s.root, "user-sidebar")}>
      <div className="menu-box">
        <div className="group-title">Mua hàng</div>
        <div className="list-menu">
          <MenuItem subMenu="orders" title="Đơn mua hàng " pid={pid}>
            <GiShoppingBag />
          </MenuItem>
          <MenuItem subMenu="address-book" title="Địa chỉ" pid={pid}>
            <FaAddressCard />
          </MenuItem>
        </div>
      </div>
      <div className="menu-box">
        <div className="group-title">Cửa hàng</div>
        <div className="list-menu">
          <MenuItem subMenu="shop-products" title="sản phẩm" pid={pid}>
            <RiDatabase2Line />
          </MenuItem>
          <MenuItem subMenu="shop-orders" title="Đơn hàng" pid={pid}>
            <FaMoneyCheck />
          </MenuItem>
        </div>
      </div>
      <div className="menu-box">
        <div className="group-title">Tài khoản của tôi</div>
        <div className="list-menu">
          <MenuItem subMenu="profile" title="Thông tin tài khoản" pid={pid}>
            <FaUserCircle />
          </MenuItem>
          <MenuItem subMenu="change-password" title="Đổi mật khẩu" pid={pid}>
            <RiLockPasswordFill />
          </MenuItem>
        </div>
      </div>
    </div>
  );
};

export default UserSidebar;
