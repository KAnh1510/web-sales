import React, { useState } from "react";
import { Form } from "react-bootstrap";
import styles from "./Register.module.scss";
import classnames from "classnames/bind";
import Button from "../../Button";
import { Link } from "react-router-dom";
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Captcha from "../../Captcha";
import PageLoginRegister from "~/layout/components/PageLoginRegister";
import { useDispatch } from "react-redux";
import { registerUser } from "../UserSlice";

const cx = classnames.bind(styles);

function Register() {
  const dispatch = useDispatch();
  const [startDate, setDate] = useState("");
  const today = new Date();
  const [values, setValues] = useState([]);
  const [successMess, setSuccessMes] = useState(false);
  const [passwordError, setPasswordErr] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [passwordInput, setPasswordInput] = useState({
    password: "",
    confirmPassword: "",
  });

  const handlePasswordChange = (e) => {
    const passwordInputValue = e.target.value.trim();
    const passwordInputFieldName = e.target.name;
    const NewPasswordInput = {
      ...passwordInput,
      [passwordInputFieldName]: passwordInputValue,
    };
    setPasswordInput(NewPasswordInput);
  };

  const handleValidation = (e) => {
    const passwordInputValue = e.target.value.trim();
    const passwordInputFieldName = e.target.name;

    //for password
    if (passwordInputFieldName === "password") {
      const minLengthRegExp = /.{6,}/;

      const passwordLength = passwordInputValue.length;
      const minLengthPassword = minLengthRegExp.test(passwordInputValue);

      let errMsg = "";
      if (passwordLength === 0) {
        errMsg = "Mật khẩu chưa được nhập";
      } else if (!minLengthPassword) {
        errMsg = "Nhập mật khẩu ít nhất 6 kí tự";
      } else {
        errMsg = "";
      }
      setPasswordErr(errMsg);
    }

    // for confirm password
    if (
      passwordInputFieldName === "confirmPassword" ||
      (passwordInputFieldName === "password" &&
        passwordInput.confirmPassword.length > 0)
    ) {
      if (passwordInput.confirmPassword !== passwordInput.password) {
        setConfirmPasswordError("Mật khẩu nhập lại không trùng khớp");
      } else {
        setConfirmPasswordError("");
        setValues({ ...values, password: passwordInput.password });
      }
    }
  };

  const handleSubmitRegister = (e) => {
    e.preventDefault();
    dispatch(
      registerUser({
        name: values.name,
        email: values.email,
        phoneNumber: values.phoneNumber,
        birthday: values.birthday,
        role: "user",
        gender: values.gender,
        password: values.password,
      })
    );
    setSuccessMes(true);
    setValues({
      name: "",
      email: "",
      password: "",
      birthday: today,
    });
  };

  return (
    <PageLoginRegister title="Tạo tài khoản">
      <div className={cx("user-box")}>
        <form action="/users" id="customer_register" method="post">
          <div className={cx("input-form")}>
            <input
              required
              type="name"
              name="customer[firstName]"
              id="customer_firstName"
              value={values.name ? values.name : ""}
              onChange={(e) => {
                setValues({ ...values, name: e.target.value });
              }}
              placeholder="Tên"
            />
          </div>

          <div className={cx("form-gender")}>
            <Form.Group>
              <Form.Label
                htmlFor="gender"
                style={{
                  color: "#888",
                  fontWeight: 500,
                  paddingRight: "10px",
                  fontSize: "1.4rem",
                }}
              >
                Giới tính:{" "}
              </Form.Label>
              <Form.Control
                style={{
                  padding: "5px 10px",
                  background: "transparent",
                  outline: "none",
                  cursor: "pointer",
                }}
                as="select"
                value={values.gender}
                onChange={(e) => {
                  setValues({ ...values, gender: e.target.value });
                }}
              >
                <option value="Nam">Nam</option>
                <option value="Nữ">Nữ</option>
              </Form.Control>
            </Form.Group>
          </div>

          <div className={cx("input-form")}>
            <div className={cx("form-birthday")}>
              <input
                type="date"
                placeholder="mm/dd/yyyy"
                name="customer[birthday]"
                id="birthday"
                min={today}
                value={startDate}
                onChange={(e) => {
                  setDate(e.target.value);
                  setValues({ ...values, birthday: e.target.value });
                }}
                size="30"
              />
            </div>
          </div>

          <div className={cx("input-form")}>
            <input
              required
              type="email"
              name="customer[email]"
              id="customer_email"
              placeholder="Email"
              value={values.email ? values.email : ""}
              onChange={(e) => {
                setValues({ ...values, email: e.target.value });
              }}
            />
          </div>

          <div className={cx("input-form")}>
            <div className="form-group mb-4">
              <input
                type="password"
                value={passwordInput.password}
                onChange={handlePasswordChange}
                onKeyUp={handleValidation}
                name="password"
                placeholder="Mật khẩu"
                className="form-control"
              />
              <p className="text-danger" style={{ color: "red" }}>
                {passwordError}
              </p>
            </div>
          </div>

          <div className={cx("input-form")}>
            <div className="form-group mb-4">
              <input
                type="password"
                value={passwordInput.confirmPassword}
                onChange={handlePasswordChange}
                onKeyUp={handleValidation}
                name="confirmPassword"
                placeholder="Nhập lại mật khẩu"
                className="form-control"
              />
              <p className="text-danger" style={{ color: "red" }}>
                {confirmPasswordError}
              </p>
            </div>
          </div>

          {successMess ? (
            <p style={{ marginTop: "10px", color: "blue" }}>
              Đăng kí tài khoản thành công!
            </p>
          ) : (
            <></>
          )}

          <Captcha />

          <div className={cx("action-account")}>
            <div className={cx("btn-submit")}>
              <Button>
                <input
                  type="submit"
                  value="Đăng Kí"
                  onClick={handleSubmitRegister}
                />
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
