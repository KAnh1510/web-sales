import PropTypes from "prop-types";
import styles from "./PageAccountAddress.module.scss";
import classnames from "classnames/bind";
import { Link } from "react-router-dom";
import { useState } from "react";
import Logout from "~/components/User/Logout";
import StorageKeys from "~/constant/storage-keys";

const cx = classnames.bind(styles);

function PageAccountAddress({ title, children }) {
  const [confirmLogout, setConfirmLogout] = useState(false);
  const currentUser = JSON.parse(localStorage.getItem(StorageKeys.user));

  const handleLogout = () => {
    setConfirmLogout(true);
  };

  return (
    <div className={cx("grid")}>
      <div className={cx("row")}>
        <div className={cx("col l-12")}>
          <div className={cx("header")}>
            <h1>{title}</h1>
          </div>
        </div>
        <div className={cx("container", "grid")}>
          <div className={cx("row")}>
            <div className={cx("col l-3")}>
              <div className={cx("title")}>
                <h3>Tài khoản</h3>
              </div>
              <div className={cx("account-list")}>
                <ul>
                  <li>
                    <Link to={`/account/${currentUser.user_id}`}>
                      Thông tin tài khoản
                    </Link>
                  </li>
                  <li>
                    <Link to={`/account/address/${currentUser.user_id}`}>
                      Thông tin địa chỉ
                    </Link>
                  </li>
                  <li>
                    <a href="#!" onClick={handleLogout}>
                      Đăng xuất
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className={cx("col l-9")}>
              <div className={cx("row")}>{children}</div>
            </div>
          </div>
        </div>
      </div>
      {confirmLogout ? <Logout setConfirmLogout={setConfirmLogout} /> : <></>}
    </div>
  );
}

PageAccountAddress.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default PageAccountAddress;
