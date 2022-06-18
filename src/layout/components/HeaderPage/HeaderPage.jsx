import React from "react";
import styles from "./HeaderPage.module.scss";
import classnames from "classnames/bind";
import { Link } from "react-router-dom";

const cx = classnames.bind(styles);

function HeaderPage({ title }) {
  return (
    <div className={cx("header")}>
      <span>
        <Link to="/">Trang chủ</Link>
        <span>&nbsp;&nbsp;/&nbsp;&nbsp;</span>
      </span>
      <span>{title}</span>
    </div>
  );
}

export default HeaderPage;
