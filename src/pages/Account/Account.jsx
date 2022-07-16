import React, { useEffect } from "react";
import styles from "./Account.module.scss";
import classnames from "classnames/bind";
import { Link } from "react-router-dom";
import PageAccountAddress from "~/layout/components/PageAccountAddress";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "~/components/User/UserSlice";
import StorageKeys from "~/constant/storage-keys";

const cx = classnames.bind(styles);

export default function Account() {
  const dispatch = useDispatch();
  const currentUser = JSON.parse(localStorage.getItem(StorageKeys.user));
  const valueUser = useSelector((state) => state.users.values);

  useEffect(() => {
    dispatch(getUser(currentUser.user_id));
  }, [dispatch, currentUser.user_id]);

  return (
    <PageAccountAddress
      title="Tài khoản của bạn"
      userId={currentUser.user_id}
      key={currentUser.id}
    >
      <div className={cx("col l-12")}>
        <div className={cx("infor-account")}>
          <p className={cx("title-detail")}>Thông tin tài khoản</p>
          <div className={cx("account")}>
            <h2>Họ tên: {valueUser.name}</h2>
            <h3>Email: {valueUser.email}</h3>
            <h3>Ngày sinh: {valueUser.birthday}</h3>
            <h3>Giới tính: {valueUser.gender}</h3>
          </div>
        </div>

        <div className={cx("address")}>
          <Link
            to={`/account/address/${valueUser.id}`}
            className={cx("view-address")}
          >
            Xem địa chỉ
          </Link>
        </div>
      </div>
    </PageAccountAddress>
  );
}
