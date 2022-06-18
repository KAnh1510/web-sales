import React from "react";

import styles from "./Register.module.scss";
import classnames from "classnames/bind";
import Button from "../Button";
import { Link } from "react-router-dom";
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Capcha from "../Capcha";
import PageLoginRegister from "~/layout/components/PageLoginRegister";

const cx = classnames.bind(styles);

function Register() {
  return (
    <PageLoginRegister title="Tạo tài khoản">
      <div className={cx("user-box")}>
        <form action="/account/register" id="customer_register" method="post">
          <div className={cx("input-form")}>
            <input
              required
              type="lastName"
              name="customer[lastName]"
              id="customer_lastName"
              placeholder="Họ"
            />
          </div>

          <div className={cx("input-form")}>
            <input
              required
              type="firstName"
              name="customer[firstName]"
              id="customer_firstName"
              placeholder="Tên"
            />
          </div>

          <div className={cx("form-gender")}>
            <input id="radio1" type="radio" value="0" name="customer[gender]" />
            <label htmlFor="radio1">Nữ</label>
            <input id="radio2" type="radio" value="1" name="customer[gender]" />
            <label htmlFor="radio2">Nam</label>
          </div>

          <div className={cx("form-birthday")}>
            <label htmlFor="birthday">
              <i className="icon-login icon-envelope "></i>
            </label>
            <input
              type="date"
              placeholder="mm/dd/yyyy"
              name="customer[birthday]"
              id="birthday"
              size="30"
            />
          </div>

          <div className={cx("input-form")}>
            <input
              required
              type="email"
              name="customer[email]"
              id="customer_email"
              placeholder="Email"
            />
          </div>

          <div>
            <input
              required=""
              type="password"
              name="customer[password]"
              id="customer_password"
              placeholder="Mật khẩu"
              size="16"
            />
          </div>

          <Capcha />

          <div className={cx("action-account")}>
            <div className={cx("btn-submit")}>
              <Button>
                <input type="submit" value="Đăng Kí" />
              </Button>
            </div>
          </div>
          <div className={cx("return-login")}>
            <Link to="/account/login" title="Đăng nhập">
              <FontAwesomeIcon icon={faArrowLeftLong} />
              <span>Đăng nhập</span>
            </Link>
          </div>
        </form>
      </div>
    </PageLoginRegister>
  );
}

export default Register;
