import styles from "./Payment.module.scss";
import classnames from "classnames/bind";
import HeaderPage from "~/layout/components/HeaderPage";
import Images from "~/components/Images";
import { Link } from "react-router-dom";
import Button from "~/components/Button";

const cx = classnames.bind(styles);

function Payment() {
  return (
    <div className={cx("wrapper", "grid")}>
      <div className={cx("row")}>
        <div className={cx("col l-6", "main")}>
          <div className={cx("main-header")}>
            <h1>COLDKIDSCLUBVN</h1>
            <HeaderPage title="Phương thức thanh toán" />
          </div>
          <div className={cx("main-content")}>
            <div className={cx("section")}>
              <div className={cx("section-header")}>
                <h2>Thông tin giao hàng</h2>
              </div>
              <div className={cx("section-content")}>
                <div className={cx("logged-in-customer-information")}>
                  <div
                    className={cx(
                      "logged-in-customer-information-avatar-wrapper"
                    )}
                  >
                    <Images src="https://www.gravatar.com/avatar/30dede84fd5bb8b9e3d67d1d12976782.jpg?s=100&d=blank" />
                  </div>
                  <p className={cx("logged-in-customer-information-paragraph")}>
                    Nguyen Anh (nguyenkimanh15102000@gmail.com)
                    <br />
                    <Link to="/account/login">Đăng xuất</Link>
                  </p>
                </div>

                <div className={cx("fieldset")}>
                  <div className={cx("field")}>
                    <div className={cx("field-input-wrapper")}>
                      <label
                        className={cx("field-label")}
                        for="stored_addresses"
                      >
                        Thêm địa chỉ mới...
                      </label>
                      <select
                        className={cx("field-input")}
                        id="stored_addresses"
                      >
                        {/* <option value="0" data-properties="{}">
                          Địa chỉ đã lưu trữ
                        </option>

                        <option
                          value="1104586138"
                          data-properties='{"id":1104586138,
																				"last_name":"Anh",
																				"first_name":"Nguyễn Thị",
																				"phone":"0359127610",
																				"address1":"Hà nội",
																				"zip":null,
																				"city":null,
																				"country":"Vietnam",
																				"country_id":"241",
																				"province":null,
																				"province_id":null,
																				"district":null,
																				"district_id":null,
																				"ward":null,
																				"wardid":null,
																				"default":true}'
                          selected=""
                        >
                          0359127610, Hà nội, Vietnam
                        </option>

                        <option
                          value="1104988919"
                          data-properties='{"id":1104988919,
																				"last_name":"Anh Nguyễn",
																				"first_name":"Thị",
																				"phone":"0359127610",
																				"address1":"Hà nội",
																				"zip":null,
																				"city":null,
																				"country":"Vietnam",
																				"country_id":"241",
																				"province":null,
																				"province_id":null,
																				"district":null,
																				"district_id":null,
																				"ward":null,
																				"wardid":null,
																				"default":false}'
                        >
                          0359127610, Hà nội, Vietnam
                        </option> */}
                      </select>
                    </div>
                  </div>

                  <div className={cx("field")}>
                    <div className={cx("field-input-wrapper")}>
                      <label
                        className={cx("field-label")}
                        for="billing_address_full_name"
                      >
                        Họ và tên
                      </label>
                      <input
                        placeholder="Họ và tên"
                        autocapitalize="off"
                        spellcheck="false"
                        className={cx("field-input")}
                        size="30"
                        type="text"
                        id="billing_address_full_name"
                        name="billing_address[full_name]"
                        value="Anh Nguyễn Thị"
                        autocomplete="false"
                      />
                    </div>
                  </div>

                  <div className={cx("field")}>
                    <div className={cx("field-input-wrapper")}>
                      <label
                        className={cx("field-label")}
                        for="billing_address_phone"
                      >
                        Số điện thoại
                      </label>
                      <input
                        autocomplete="false"
                        placeholder="Số điện thoại"
                        autocapitalize="off"
                        spellcheck="false"
                        className={cx("field-input")}
                        size="30"
                        maxlength="15"
                        type="tel"
                        id="billing_address_phone"
                        name="billing_address[phone]"
                        value="0359127610"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={cx("footer")}>
              <Link to={"/cart"}>Giỏ hàng</Link>
              <button className={cx("btn-payment")}>
                Tiếp tục đến phương thức thanh toán
              </button>
            </div>
          </div>
        </div>
        <div className={cx("col l-6")}>
          <div className={cx("sidebar-content")}>
            <div className={cx("row", "prd-info")}>
              <div className={cx("col l-2", "prd-img-wrapper")}>
                <div className={cx("prd-img")}>
                  <Images src="" />
                </div>
                <span className={cx("prd-quantity")}>1</span>
              </div>
              <div className={cx("col l-7", "prd-desc")}>
                <span className={cx("prd-name")}>CND SUMMER TEE BLUE</span>
                <span className={cx("prd-size")}>SIZE L</span>
              </div>
              <div className={cx("col l-3", "prd-price")}>
                <span>320000</span>
              </div>
            </div>
            <div className={cx("prd-total")}>
              <table className={cx("total-line-table")}>
                <thead>
                  <tr>
                    <th scope="col"></th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr className={cx("total-line")}>
                    <td>Tạm tính</td>
                    <td>
                      <span
                        className={cx("order-summary-emphasis")}
                        data-checkout-subtotal-price-target="32000000"
                      >
                        320,000₫
                      </span>
                    </td>
                  </tr>

                  <tr className={cx("total-line")}>
                    <td>Phí vận chuyển</td>
                    <td>
                      <span
                        className={cx("order-summary-emphasis")}
                        data-checkout-total-shipping-target="4000000"
                      >
                        —
                      </span>
                    </td>
                  </tr>
                </tbody>
                <tfoot className={cx("total-line-table-footer")}>
                  <tr className={cx("total-line")}>
                    <td className={cx("payment-due-label")}>
                      <span className={cx("payment-due-label-total")}>
                        Tổng cộng
                      </span>
                    </td>
                    <td className={cx("payment-due")}>
                      <span className={cx("payment-due-currency")}>VND</span>
                      <span
                        className={cx("payment-due-price")}
                        data-checkout-payment-due-target="32000000"
                      >
                        320,000₫
                      </span>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
