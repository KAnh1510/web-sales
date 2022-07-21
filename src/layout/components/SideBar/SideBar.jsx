import { Link, NavLink } from "react-router-dom";
import classnames from "classnames/bind";
import styles from "./SideBar.module.scss";
import { LISTSIDEBAR } from "~/data";
import StorageKeys from "~/constant/storage-keys";
import Images from "~/components/Images";

const cx = classnames.bind(styles);

function SideBar() {
  const currentUser = JSON.parse(localStorage.getItem(StorageKeys.user));

  return (
    <div className={cx("wrapper")}>
      <Link to="/" title="Logo">
        <Images
          src="https://file.hstatic.net/200000436739/file/logo-01-01_09ce146264e44644ba139b66098f2e6c.png"
          alt="Logo"
          className={cx("logo")}
        />
      </Link>
      <ul className={cx("sideBar-list")}>
        {LISTSIDEBAR.map((item, index) => {
          return (
            <li key={index}>
              {currentUser && item.to2 ? (
                <NavLink
                  to={item.to2 + currentUser.user_id}
                  title={item.title}
                  className={({ isActive }) => (isActive ? cx("active") : " ")}
                >
                  {item.title}
                </NavLink>
              ) : (
                <NavLink
                  to={item.to}
                  title={item.title}
                  className={({ isActive }) => (isActive ? cx("active") : " ")}
                >
                  {item.title}
                </NavLink>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default SideBar;
