import { Link, NavLink } from "react-router-dom";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import classnames from "classnames/bind";
import styles from "./SideBar.module.scss";

const cx = classnames.bind(styles);
const listSidebar = [
  {
    title: "ColdKid's story",
    to: "/",
  },
  {
    title: "Shop",
    to: "/collections",
  },
  {
    title: "Magazine",
    to: "/blog/news",
  },
  {
    title: "Contact us",
    to: "/pages/contact",
  },
  {
    title: "Login",
    to: "/login",
  },
  {
    title: "Requiment",
    to: "/login",
  },
];
function SideBar() {
  return (
    <div className={cx("wrapper")}>
      <Link to="/">
        <img
          src="https://file.hstatic.net/200000436739/file/logo-01-01_09ce146264e44644ba139b66098f2e6c.png"
          alt="Logo"
          className={cx("logo")}
        />
      </Link>
      <ul className={cx("sideBar-list")}>
        {listSidebar.map((item, index) => {
          return (
            <li key={index}>
              <Tippy
                delay={[300, 50]}
                content={item.title}
                placement="right-end"
                animation="scale-subtle"
              >
                <NavLink
                  to={item.to}
                  className={({ isActive }) => (isActive ? cx("active") : " ")}
                >
                  {item.title}
                </NavLink>
              </Tippy>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default SideBar;
