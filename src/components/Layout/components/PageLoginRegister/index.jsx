import React from "react";
import styles from "./PageLoginRegister.module.scss";
import classnames from "classnames/bind";

const cx = classnames.bind(styles);

function PageLoginRegister({ title, children }) {
  return (
    <div className={cx("grid")}>
      <div className={cx("row")}>
        <div className={cx("col l-6")}>
          <div className={cx("wrapper")}>
            <div className={cx("title")}>
              <h1>{title}</h1>
            </div>
          </div>
        </div>
        <div className={cx("col l-6")}>
          <div className={cx("content")}>{children}</div>
        </div>
      </div>
    </div>
  );
}

export default PageLoginRegister;
