import React, { useEffect, useState } from "react";

import styles from "./Login.module.scss";
import classnames from "classnames/bind";
import Button from "../../Button";
import { Link, useNavigate } from "react-router-dom";
import Captcha from "../../Captcha";
import PageLoginRegister from "~/layout/components/PageLoginRegister";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../UserSlice";
import { Form } from "react-bootstrap";
import { loginUser } from "../AuthSlice";

const cx = classnames.bind(styles);

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [forgotPassword, setForgotPassword] = useState(false);
  const [errMes, setErrMes] = useState(false);
  const userList = useSelector((state) => state.users.values);
  const [values, setValues] = useState({});

  const currentUser = [];
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
  }, [dispatch]);

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

            <div className={cx("action-account")}>
              <div className={cx("btn-submit")}>
                <Button onClick={handleLogin}>
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
          </Form>
        </div>
      )}
    </PageLoginRegister>
  );
}

export default Login;
