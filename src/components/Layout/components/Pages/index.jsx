import React from "react";
import styles from "./Pages.module.scss";
import classnames from "classnames/bind";
import { Link } from "react-router-dom";

const cx = classnames.bind(styles);

function Pages({ children, title }) {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("header")}>
        <span>
          <Link to="/">Trang chủ</Link>
          <span>&nbsp;&nbsp;/&nbsp;&nbsp;</span>
        </span>
        <span>{title}</span>
      </div>
      <div className={cx("container")}>
        <div className={cx("sideBar")}>
          <h3>Danh mục trang</h3>
          <ul>
            <li>
              <Link to="/search">Tìm Kiếm</Link>
            </li>
            <li>
              <Link to="/pages/about">Giới thiệu</Link>
            </li>
            <li>
              <Link to="/pages/return">Chính sách đổi trả</Link>
            </li>
            <li>
              <Link to="/pages/private">Chính sách bảo mật</Link>
            </li>
            <li>
              <Link to="/pages/service">Điều khoản dịch vụ</Link>
            </li>
            <li>
              <Link to="/pages/contact">Liên Hệ</Link>
            </li>
          </ul>
        </div>
        <div className={cx("content")}>
          <h1>{title}</h1>
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
}

export default Pages;
