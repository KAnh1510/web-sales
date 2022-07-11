import React, { useEffect } from "react";
import styles from "./Account.module.scss";
import classnames from "classnames/bind";
import { Link, useParams } from "react-router-dom";
import PageAccountAddress from "~/layout/components/PageAccountAddress";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "~/components/User/UserSlice";

const cx = classnames.bind(styles);

export default function Account() {
  const params = useParams();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.users.values);

  useEffect(() => {
    dispatch(getUser(params.id));
  }, []);

  return currentUser.map((user) => (
    <PageAccountAddress
      title="Tài khoản của bạn"
      userId={user.id}
      key={user.id}
    >
      <div className={cx("col l-12")}>
        <div className={cx("infor-account")}>
          <p className={cx("title-detail")}>Thông tin tài khoản</p>
          <div className={cx("account")}>
            <h2>Họ tên: {user.name}</h2>
            <h3>Email: {user.email}</h3>
            <h3>Ngày sinh: {user.birthday}</h3>
            <h3>Giới tính: {user.gender}</h3>
          </div>
        </div>

        <div className={cx("address")}>
          <Link
            to={`/account/address/${user.id}`}
            className={cx("view-address")}
          >
            Xem địa chỉ
          </Link>
        </div>
      </div>
    </PageAccountAddress>
  ));
}
