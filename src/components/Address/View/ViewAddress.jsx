import React from "react";

import styles from "./ViewAddress.module.scss";
import classnames from "classnames/bind";

const cx = classnames.bind(styles);
function ViewAddress({ className }) {
  return (
    <div className={cx(className)}>
      <div className={cx("view-address")}>
        <div className={cx("row")}>
          <div className={cx("col l-12")}>
            <p>
              <strong>Nguyen Anh</strong>
            </p>
          </div>

          <div className={cx("col l-4 ")}>
            <p>
              <b>Công ty:</b>
            </p>
          </div>
          <div className={cx("col l-8 ")}>
            <p>
              <b>SVMC</b>
            </p>
          </div>

          <div className={cx("col l-4")}>
            <p>
              <b>Địa chỉ:</b>
            </p>
          </div>
          <div className={cx("col l-8")}>
            <p>
              <b>Việt Nam</b>
            </p>
          </div>

          <div className={cx("col l-4")}>
            <p>
              <b>Số điện thoại:</b>
            </p>
          </div>
          <div className={cx("col l-8")}>
            <p>
              <b>123456</b>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewAddress;
