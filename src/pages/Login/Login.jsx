import React, { useEffect, useState } from "react";

import classnames from "classnames/bind";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Form } from "react-bootstrap";
import styles from "./Login.module.scss";

import PageLoginRegister from "~/layout/components/PageLoginRegister";
import { loginUser } from "./AuthSlice";
import { getAllUsers } from "~/components/User/UserSlice";
import Captcha from "~/components/Captcha";
import Button from "~/components/Button";

const cx = classnames.bind(styles);

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [forgotPassword, setForgotPassword] = useState(false);
  const [errMes, setErrMes] = useState(false);
  const userList = useSelector((state) => state.users.values);
  const [values, setValues] = useState({});

  const currentUser = [];
  userList.length > 0 &&
    userList.forEach((user) => {
      if (
        user.email === values.email &&
        user.password === values.password &&
        user.role === "user"
      ) {
        currentUser.push(user);
      }
    });

  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (currentUser.length > 0) {
      navigate(`/account/${currentUser[0].id}`);
      dispatch(
        loginUser({
          user_id: currentUser[0].id,
          role: "user",
          email: values.email,
          password: values.password,
          login_at: new Date().toLocaleString(),
        })
      );
    } else setErrMes(true);
  };

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
            <Captcha />
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
          <Form>
            <div className={cx("input-form")}>
              <input
                required
                type="email"
                name="customer[email]"
                values={values.email}
                onChange={(e) =>
                  setValues({ ...values, email: e.target.value })
                }
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
                values={values.password}
                onChange={(e) =>
                  setValues({ ...values, password: e.target.value })
                }
                placeholder="Mật khẩu"
                size="16"
              />
            </div>

            {errMes ? (
              <p style={{ marginTop: "10px", color: "red" }}>
                Email hoặc mật khẩu không đúng! Vui lòng kiểm tra lại.
              </p>
            ) : (
              <></>
            )}

            <Captcha />

            <div className={cx("action-account", "row")}>
              <div className={cx("btn-submit", "col l-6 m-6 c-12")}>
                <Button onClick={handleLogin}>
                  <input type="submit" value="Đăng nhập" />
                </Button>
              </div>
              <div className={cx("res-pass", "col l-6 m-6 c-12")}>
                <p
                  title="Mật khẩu"
                  onClick={() => setForgotPassword(!forgotPassword)}
                >
                  Quên mật khẩu?
                </p>
                <br className="col c-0" />
                hoặc
                <Link to="/account/register" title="Đăng ký">
                  Đăng ký
                </Link>
              </div>
            </div>
          </Form>
        </div>
      )}
    </PageLoginRegister>
  );
}

export default Login;
