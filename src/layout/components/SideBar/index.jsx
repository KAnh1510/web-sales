import { Link, NavLink } from "react-router-dom";
import classnames from "classnames/bind";
import styles from "./SideBar.module.scss";
import { LISTSIDEBAR } from "~/data";

const cx = classnames.bind(styles);

function SideBar() {
  return (
    <div className={cx("wrapper")}>
      <Link to="/" title="Logo">
        <img
          src="https://file.hstatic.net/200000436739/file/logo-01-01_09ce146264e44644ba139b66098f2e6c.png"
          alt="Logo"
          className={cx("logo")}
        />
      </Link>
      <ul className={cx("sideBar-list")}>
        {LISTSIDEBAR.map((item, index) => {
          return (
            <li key={index}>
              <NavLink
                to={item.to}
                title={item.title}
                className={({ isActive }) => (isActive ? cx("active") : " ")}
              >
                {item.title}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default SideBar;
