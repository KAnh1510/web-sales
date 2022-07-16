import React from "react";
import PropTypes from "prop-types";
import styles from "./ViewAddress.module.scss";
import classnames from "classnames/bind";

const cx = classnames.bind(styles);
function ViewAddress({ className, currentUser }) {
  return (
    <div className={cx(className)}>
      <div className={cx("view-address")}>
        <div className={cx("row")}>
          <div className={cx("col l-12")}>
            <p>
              <strong>{currentUser.name}</strong>
            </p>
          </div>

          <div className={cx("col l-4")}>
            <p>
              <b>Địa chỉ:</b>
            </p>
          </div>
          <div className={cx("col l-8")}>
            <p>
              <b>{currentUser.address}</b>
            </p>
          </div>

          <div className={cx("col l-4")}>
            <p>
              <b>Số điện thoại:</b>
            </p>
          </div>
          <div className={cx("col l-8")}>
            <p>
              <b>{currentUser.phoneNumber}</b>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

ViewAddress.propTypes = {
  className: PropTypes.string,
  currentUser: PropTypes.object.isRequired,
};

export default ViewAddress;
