import { DefaultSeo } from "next-seo";
import React, { FC } from "react";
import { useUI } from "./../../ui/context";
import config from "../../../config/seo.json";
import Navbar from "../Navbar/Navbar";
type Props = {
  children: any;
  hideHeader?: boolean;
};

const Layout: FC<Props> = ({ children, hideHeader }) => {
  const { displaySidebar, displayModal } = useUI();
  // const { acceptedCookies, onAcceptCookies }= useAcceptCookies()
  let darkMode = true;
  return (
    <div id="App">
      <DefaultSeo {...config} />
      <header>
        <Navbar hideHeader={hideHeader} darkMode={darkMode} />
      </header>
      {children}
    </div>
  );
};

export default Layout;
