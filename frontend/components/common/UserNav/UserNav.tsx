import dynamic from "next/dynamic";
import React from "react";
import s from "./UserNav.module.css";
import cn from "classnames";
import CartBox from "../CartBox.module.css/CartBox";
type Props = {
  className?: string;
};

const UserNav: React.FC<Props> = ({ className }) => {
  const AuthMenu = dynamic(() => import("./AuthMenu"));
  return (
    <nav className={cn(s.root, className)}>
      <div className={s.mainContainer}>{typeof window !== "undefined" && <AuthMenu />}
      <CartBox/>
      </div>
    </nav>
  );
};

export default UserNav;
