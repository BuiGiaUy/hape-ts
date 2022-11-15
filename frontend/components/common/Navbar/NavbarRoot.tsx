import React, { FC } from "react";
import throttle from "lodash.throttle";
import cn from "classnames"
import s from "./Navbar.module.css"
interface Props {
  children?: any;
}
const NavbarRoot: FC<Props> = ({ children }) => {
  const [hasScrolled, setHasScrolled] = React.useState(false);
  const staticNavbar = true;
  React.useEffect(() => {
    const handleScroll = throttle(() => {
      const offset = 50;
      const { scrollTop } = document.documentElement;
      const scrolled = scrollTop > offset;

      if (hasScrolled !== scrolled) {
        setHasScrolled(scrolled);
      }
    }, 200);

    document.addEventListener('scroll', handleScroll)
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, [hasScrolled]);
  return <div className={cn(s.root,{})}>{children}</div>;
};

export default NavbarRoot;
