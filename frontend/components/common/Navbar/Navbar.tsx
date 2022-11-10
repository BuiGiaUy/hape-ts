import Link from "next/link";
import React from "react";
import { FC } from "react";

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
            <div className="">
              <div className="">
                <Link href="" className="">
                  <Hape fill="#DB4140"></Hape>
                </Link>
              </div>
            </div>
          </Container>
        </NavbarRoot>
      )}
    </>
  );
};

export default Navbar;
