import React, { useState } from "react";
import styles from "./Contact.module.scss";
import classnames from "classnames/bind";
import Button from "~/components/Button";
import Captcha from "~/components/Captcha";
import { useDispatch } from "react-redux";
import { createQuestion } from "./ContactSlice";

const cx = classnames.bind(styles);

function Contact() {
  const dispatch = useDispatch();
  const [mess, setMess] = useState(false);
  const [values, setValues] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    note: "",
  });

  const handleSubmit = () => {
    dispatch(
      createQuestion({
        name: values.name,
        email: values.email,
        phoneNumber: values.phoneNumber,
        note: values.note,
      })
    );
    setMess(true);
  };
  return (
    <div className={cx("contact row")}>
      <div className={cx("col l-6")}>
        <div className={cx("map")}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.157376607699!2d106.6786539405679!3d10.799255989063358!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3175296a896275f3%3A0x3277c214e39e4343!2sShop%20colkids.club!5e0!3m2!1svi!2s!4v1654695386197!5m2!1svi!2s"
            style={{ width: "600px", height: "100%", border: 0 }}
            allowFullScreen=""
            loading="lazy"
            title="Map"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
      <div className={cx("col l-6")}>
        <div className={cx("info")}>
          <h1 className={cx("header")}>Liên Hệ</h1>
          <div className={cx("box-contact")}>
            <ul className={cx("address")}>
              <li>
                <p>Địa chỉ chúng tôi</p>
                <p>
                  <strong>
                    10/4 Đoàn Thị Điểm, phường 1, quận Phú Nhuận, TP. Hồ Chí
                    Minh
                  </strong>
                </p>
              </li>
              <li>
                <p>Email chúng tôi</p>
                <p>
                  <strong>colkidsclubcontact@gmail.com</strong>
                </p>
              </li>
              <li>
                <p>Điện thoại</p>
                <p>
                  <strong>1900633549</strong>
                </p>
              </li>
              <li>
                <p>Thời gian làm việc</p>
                <p>
                  <strong>09:00 - 21:00</strong>
                </p>
              </li>
            </ul>
          </div>
          <h2 className={cx("title")}>Gửi thắc mắc về cho chúng tôi</h2>
          <div className={cx("contact-form")}>
            <div className={cx("row")}>
              <div className={cx("col l-12")}>
                <div className={cx("input-group")}>
                  <input
                    type="text"
                    required
                    name="name"
                    placeholder="Tên của bạn"
                    value={values.name}
                    onChange={(e) =>
                      setValues({ ...values, name: e.target.value })
                    }
                    className={cx("form-control")}
                  />
                </div>
              </div>
              <div className={cx("col l-6")}>
                <div className={cx("input-group")}>
                  <input
                    type="text"
                    required
                    name="email"
                    placeholder="Email của bạn"
                    value={values.email}
                    onChange={(e) =>
                      setValues({ ...values, email: e.target.value })
                    }
                    className={cx("form-control")}
                  />
                </div>
              </div>
              <div className={cx("col l-6")}>
                <div className={cx("input-group")}>
                  <input
                    type="text"
                    required
                    name="phone"
                    placeholder="Số điện thoại của bạn"
                    value={values.phoneNumber}
                    onChange={(e) =>
                      setValues({ ...values, phoneNumber: e.target.value })
                    }
                    className={cx("form-control")}
                  />
                </div>
              </div>
              <div className={cx("col l-12")}>
                <div className={cx("input-group")}>
                  <textarea
                    type="text"
                    required
                    name="note"
                    placeholder="Nội dung"
                    value={values.note}
                    onChange={(e) =>
                      setValues({ ...values, note: e.target.value })
                    }
                    className={cx("form-control")}
                  />
                  <Captcha />
                </div>
              </div>

              {mess ? (
                <p style={{ marginTop: "10px", color: "blue" }}>
                  Bạn đã gửi phản hồi cho chúng tôi ^^
                </p>
              ) : (
                <></>
              )}

              <div className={cx("col l-12")}>
                <Button onClick={handleSubmit}>Gửi cho chúng tôi</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
