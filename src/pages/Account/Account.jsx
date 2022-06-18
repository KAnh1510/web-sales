import React from "react";
import styles from "./Account.module.scss";
import classnames from "classnames/bind";
import { Link } from "react-router-dom";
import PageAccountAddress from "~/layout/components/PageAccountAddress";

const cx = classnames.bind(styles);

export default function Account() {
  return (
    <PageAccountAddress title="Tài khoản của bạn">
      <div className={cx("col l-12")}>
        <div className={cx("infor-account")}>
          <p className={cx("title-detail")}>Thông tin tài khoản</p>
          <h2 className={cx("name-account")}>Nguyen Anh</h2>
          <p className={cx("email")}>nguyenkimanh15102000@gmail.com</p>
        </div>

        <div className={cx("address")}>
          <Link to="/account/address" className={cx("view-address")}>
            Xem địa chỉ
          </Link>
        </div>
      </div>
      <div className={cx("col l-12")}>
        <div className={cx("customer-order-wrap")}>
          <div className={cx("customer-order")}>
            <p>Bạn chưa đặt mua sản phẩm</p>
          </div>
        </div>
      </div>
    </PageAccountAddress>
  );
}
