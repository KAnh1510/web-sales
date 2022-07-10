/* eslint-disable jsx-a11y/anchor-is-valid */
import PropTypes from "prop-types";
import React, { useState } from "react";

import styles from "./EditAddress.module.scss";
import classnames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faPhone, faUser } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { updateUser } from "~/components/User/UserSlice";
import { Form } from "react-bootstrap";

const cx = classnames.bind(styles);

function EditAddress(props) {
  const { className, setEdit, setAddAddress, currentUser } = props;
  const [values, setValues] = useState(currentUser[0]);
  const [successMess, setSuccessMes] = useState(false);
  const dispatch = useDispatch();

  const handleUpdateUser = (e) => {
    e.preventDefault();
    dispatch(
      updateUser({
        id: values.id,
        data: {
          name: values.name,
          address: values.address,
          phoneNumber: values.phoneNumber,
        },
      })
    );
    setSuccessMes(true);
  };

  return (
    <div className={cx(className)}>
      <div className={cx("edit-address")}>
        <Form>
          <div className={cx("input-group")}>
            <span className={cx("input-group-addon")}>
              <FontAwesomeIcon icon={faUser} />
            </span>
            <input
              type="text"
              id="address_name"
              className={cx("form-control", "textbox")}
              name="address[name]"
              size="40"
              value={values.name}
              onChange={(e) => setValues({ ...values, name: e.target.value })}
              placeholder="Họ Tên"
            />
          </div>
          <div className={cx("input-group")}>
            <span className={cx("input-group-addon")}>
              <FontAwesomeIcon icon={faHome} />
            </span>
            <input
              type="text"
              id="address_address"
              className={cx("form-control", "textbox")}
              name="address[address]"
              size="40"
              value={values.address}
              onChange={(e) =>
                setValues({ ...values, address: e.target.value })
              }
              placeholder="Vui lòng nhập địa chỉ chi tiết..."
            />
          </div>
          <div className={cx("input-group")}>
            <span className={cx("input-group-addon")}>
              <FontAwesomeIcon icon={faPhone} />
            </span>
            <input
              type="text"
              id="address_phone"
              className={cx("form-control", "textbox")}
              name="address[phone]"
              size="40"
              value={values.phoneNumber}
              onChange={(e) =>
                setValues({ ...values, phoneNumber: e.target.value })
              }
              placeholder="Số điện thoại"
            />
          </div>

          {successMess ? (
            <p style={{ marginTop: "10px", color: "blue" }}>
              Cập nhật tài khoản thành công!
            </p>
          ) : (
            <></>
          )}
          <div className={cx("action_bottom")}>
            <button
              type="submit"
              className={cx("btn bt-primary")}
              onClick={handleUpdateUser}
            >
              Cập nhật
            </button>
            <span className={cx("")}>
              hoặc{" "}
              <a
                href="#"
                // eslint-disable-next-line no-sequences
                onClick={() => (setEdit(false), setAddAddress(false))}
              >
                Hủy
              </a>
            </span>
          </div>
        </Form>
      </div>
    </div>
  );
}

EditAddress.propTypes = {
  className: PropTypes.string,
  setEdit: PropTypes.func,
  setAddAddress: PropTypes.bool,
};

export default EditAddress;
