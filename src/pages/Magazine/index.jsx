import React from "react";
import styles from "./Magazine.module.scss";
import classnames from "classnames/bind";
import { Link, NavLink, Outlet } from "react-router-dom";
import { DefaultLayout } from "~/components/Layout";
import { COLLECTION } from "~/data";
import HeaderPage from "~/components/Layout/components/HeaderPage";

const cx = classnames.bind(styles);

function Magazine() {
  return (
    <DefaultLayout>
      <HeaderPage title="Tin tức" />
      <div className={cx("container", "grid")}>
        <h2 className={cx("header")}>Tin tức</h2>
        <div className={cx("content", "row")}>
          <div className={cx("col l-4")}>
            <Link to={"/"}>
              <img
                className={cx("img")}
                src="https://file.hstatic.net/200000436739/article/untitled-1-01_928d5005c073474c8037d7181050e768_grande.jpg"
                alt="aaa"
              />
            </Link>
          </div>
          <div className={cx("title", "col l-4")}>
            <div className={cx("title-link")}>
              <Link to={"/"} className={cx("title-link")}>
                Behind the scenes/ LOOKBOOK tháng 11
              </Link>
            </div>
            <span className={cx("subtitle")}>
              Người viết: DESIGN /&nbsp;
              <span className={cx("create-date")}>05.12.2021</span>
            </span>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}

export default Magazine;
