import { Link, NavLink } from "react-router-dom";
import classnames from "classnames/bind";
import styles from "./SideBar.module.scss";
import { LISTSIDEBAR } from "~/data";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAuthUser } from "~/components/User/AuthSlice";

const cx = classnames.bind(styles);

function SideBar() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.values);

  useEffect(() => {
    dispatch(getAuthUser());
  }, []);

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
              {currentUser.length > 0 && item.to2 ? (
                <NavLink
                  to={item.to2 + currentUser[0].user_id}
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
