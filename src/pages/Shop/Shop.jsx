import styles from "./Shop.module.scss";
import classnames from "classnames/bind";
import { NavLink, Outlet } from "react-router-dom";
import User from "~/components/User";

import DefaultLayout from "~/layout/DefaultLayout";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllCollections } from "~/components/Collections/CollectionSlice";

const cx = classnames.bind(styles);

function Shop() {
  const dispatch = useDispatch();
  const collectionList = useSelector((state) => state.collections.values);

  useEffect(() => {
    dispatch(getAllCollections());
  }, [dispatch]);

  return (
    <DefaultLayout>
      <div className={cx("wrapper")}>
        <div className={cx("banner", "col c-12")}>
          <img
            src="https://file.hstatic.net/200000436739/file/banner-shop-01_2138b3e555b142c699a9ece6eace8f45.jpg"
            alt="Welcome"
          />
        </div>
        <div className={cx("collection", "row")}>
          <div className={cx("title", "col", "l-10", "m-12", "c-12")}>
            <ul>
              {collectionList.map((item) => (
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
          <div className={cx("choose", "col", "l-2", "m-0", "c-0")}>
            <User />
          </div>
        </div>
        <Outlet />
      </div>
    </DefaultLayout>
  );
}

export default Shop;
