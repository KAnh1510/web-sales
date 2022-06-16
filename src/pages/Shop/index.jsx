import styles from "./Shop.module.scss";
import classnames from "classnames/bind";
import { NavLink, Outlet } from "react-router-dom";
import User from "~/components/User";
import { DefaultLayout } from "~/components/Layout";
import { COLLECTION } from "~/data";

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";

const cx = classnames.bind(styles);

function Shop() {
  return (
    <DefaultLayout>
      <div className={cx("wrapper")}>
        <div className={cx("banner")}>
          <img
            src="https://file.hstatic.net/200000436739/file/banner-shop-01_2138b3e555b142c699a9ece6eace8f45.jpg"
            alt="Welcome"
          />
        </div>
        <div className={cx("collection")}>
          <div className={cx("title")}>
            <ul>
              {COLLECTION.map((item) => (
                <li key={item.id}>
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? cx("active") : " "
                    }
                    to={item.title}
                  >
                    {item.title}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
          <div className={cx("choose")}>
            <User />
          </div>
        </div>
        <Outlet />
      </div>
    </DefaultLayout>
  );
}

export default Shop;
