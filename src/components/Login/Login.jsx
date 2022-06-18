import React, { useState } from "react";

import styles from "./Login.module.scss";
import classnames from "classnames/bind";
import Button from "../Button";
import { Link } from "react-router-dom";
import Capcha from "../Capcha";
import PageLoginRegister from "~/layout/components/PageLoginRegister";

const cx = classnames.bind(styles);

function Login() {
  const [forgotPassword, setForgotPassword] = useState(false);

  return (
    <PageLoginRegister title="Đăng nhập">
      {forgotPassword ? (
        <div className={cx("recovered-password")}>
          <div className={cx("accounttype")}>
            <h2>Phục hồi mật khẩu</h2>
          </div>
          <form action="/account/recover" method="post">
            <div className={cx("input-recover")}>
              <input
                type="email"
                size="30"
                name="email"
                placeholder="Email"
                id="recover-email"
              />
            </div>
            <Capcha />
            <div className={cx("action-account")}>
              <div className={cx("btn-submit")}>
                <Button>
                  <input type="submit" value="Gửi" />
                </Button>
              </div>
              <div className={cx("req_pass")}>
                <p onClick={() => setForgotPassword(!forgotPassword)}>Hủy</p>
              </div>
            </div>
          </form>
        </div>
      ) : (
        <div className={cx("user-box")}>
          <form action="/account/login" id="customer_login" method="post">
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
                  <input type="submit" value="Đăng nhập" />
                </Button>
              </div>
              <div className={cx("res-pass")}>
                <p
                  title="Mật khẩu"
                  onClick={() => setForgotPassword(!forgotPassword)}
                >
                  Quên mật khẩu?
                </p>
                <br />
                hoặc{" "}
                <Link to="/account/register" title="Đăng ký">
                  Đăng ký
                </Link>
              </div>
            </div>
          </form>
        </div>
      )}
    </PageLoginRegister>
  );
}

export default Login;
