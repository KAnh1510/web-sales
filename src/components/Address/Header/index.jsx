/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";

import styles from "./HeaderAddress.module.scss";
import classnames from "classnames/bind";

const cx = classnames.bind(styles);

function HeaderAddress(props) {
  const { edit, setEdit } = props;

  const handelShowEdit = () => {
    setEdit(!edit);
  };

  const handelDelete = () => {
    alert("Bạn có chắc chắn muốn xóa địa chỉ này?");
  };

  return (
    <div>
      <div className={cx("row")}>
        <div className={cx("col l-12")}>
          <div className={cx("address-title")}>
            <h3>
              <strong>Nguyen Anh</strong>
            </h3>
            <p className={cx("address-actions")}>
              <span className={cx("action-edit")}>
                <a to="#" onClick={handelShowEdit}>
                  <i
                    className={cx("fa fa-pencil-square-o")}
                    aria-hidden="true"
                  />
                </a>
              </span>
              <span className={cx("action-delete")}>
                <a to="#" onClick={handelDelete}>
                  <i className={cx("fa fa-times")} aria-hidden="true" />
                </a>
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeaderAddress;
