import Link from "next/link";
import React from "react";
import { FC } from "react";
import Hape from "../../icons/Hape";
import Container from "../../ui/Container/Container";
import SearchInput from "../SearchInput/SearchInput";
import UserNav from "../UserNav/UserNav";
import NavbarRoot from "./NavbarRoot";
import s from "./Navbar.module.css";
import cn from "classnames";

interface Props {
  darkMode?: boolean;
  hideHeader?: boolean;
}

const Navbar: FC<Props> = ({ darkMode, hideHeader }) => {
  return (
    <>
      {!hideHeader && (
        <NavbarRoot>
          <Container>
            <div className="siteNavbar relative grid grid-cols-12 justify-between ">
              <div className="col-span-3 md:col-span-1 items-center pl-2">
                <Link href="/" className={cn(s.logo)}>
                  <Hape fill="#DB4140" className="w-16 md:w-20"></Hape>
                </Link>
              </div>
              <div className="col-span-6 md:block ">
                <ul className="navMenu mt-3 ml-10 space-x-5">
                  <li>
                    <Link href="" className={s.link}>
                      Hữu cơ
                    </Link>
                  </li>
                  <li>
                    <Link href="" className={s.link}>
                      Đồ khô & hộp
                    </Link>
                  </li>
                  <li>
                    <Link href="" className={s.link}>
                      Bánh kẹo & Uống{" "}
                    </Link>
                  </li>
                  <li>
                    <Link href="" className={s.link}>
                      Nguyên liệu & gia vị
                    </Link>
                  </li>
                  <li>
                    <Link href="" className={s.link}>
                      Đông lạnh
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="col-span-5 md:col-span-2 ">
                <SearchInput />
              </div>
              <div className="col-span-4 md:col-span-3 justify-end">
                <div className="justify-end flex-1 space-x-8">
                  <UserNav />
                </div>
              </div>
            </div>
          </Container>
        </NavbarRoot>
      )}
    </>
  );
};

export default Navbar;
