/* eslint-disable jsx-a11y/anchor-is-valid */
import PropTypes from "prop-types";
import React from "react";

import styles from "./HeaderAddress.module.scss";
import classnames from "classnames/bind";

const cx = classnames.bind(styles);

function HeaderAddress(props) {
  const { edit, setEdit, currentUser } = props;

  const handelShowEdit = () => {
    setEdit(!edit);
  };

  return (
    <div>
      <div className={cx("row")}>
        <div className={cx("col l-12")}>
          <div className={cx("address-title")}>
            <h3>
              <strong>{currentUser.name}</strong>
            </h3>
            <p className={cx("address-actions")}>
              <span className={cx("action-edit")} title="Sửa">
                <a to="#" onClick={handelShowEdit}>
                  <i
                    className={cx("fa fa-pencil-square-o")}
                    aria-hidden="true"
                  />
                </a>
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

HeaderAddress.propTypes = {
  edit: PropTypes.bool,
  setEdit: PropTypes.func,
};

export default HeaderAddress;
