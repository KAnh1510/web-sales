import styles from "./Payment.module.scss";
import classnames from "classnames/bind";
import HeaderPage from "~/layout/components/HeaderPage";
import Images from "~/components/Images";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import VndFormat from "~/components/VndFormat/VndFormat";
import StorageKeys from "~/constant/storage-keys";
import { getUser } from "~/components/User/UserSlice";
import { CartIcon } from "~/components/Icons";
import { getAllProducts } from "../Products/ProductSlice";
import { createOrder } from "../OrderDone/OrderSlice";
import Logout from "../Logout";
import { createOrderDetail } from "../OrderDone/OrderDetailSlice";
import OrderDone from "../OrderDone";

const cx = classnames.bind(styles);

function Payment() {
  const dispatch = useDispatch();
  let date = new Date().toLocaleString();

  const productList = useSelector((state) => state.products.values);
  const currentUser = useSelector((state) => state.users.values);

  const currentOrderDetail = JSON.parse(
    localStorage.getItem(StorageKeys.orderDetail)
  );
  const currentOrder = JSON.parse(localStorage.getItem(StorageKeys.orders));
  const tempNote = JSON.parse(localStorage.getItem(StorageKeys.noteOrder));

  const [confirmLogout, setConfirmLogout] = useState(false);
  const [orderDone, setOrderDone] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  let totalMoney = 0;

  const handleLogout = () => {
    setConfirmLogout(true);
  };

  const { name, email, address, phoneNumber } = currentUser;

  useEffect(() => {
    dispatch(getAllProducts());
    dispatch(getUser(currentOrder.user_id));
  }, [dispatch, currentOrder.user_id]);

  const handlePayment = () => {
    dispatch(
      createOrder({
        id: currentOrder.id,
        user_id: currentOrder.user_id,
        note: tempNote.note,
        create_at: date,
        total_money: totalMoney,
      })
    );

    currentOrderDetail.temp_product.map((item) =>
      dispatch(
        createOrderDetail({
          id: Math.floor(Math.random(100) * 100) + 1,
          order_id: currentOrder.id,
          product_id: item.product_id,
          number: item.number,
          color: item.color,
          size: item.size,
        })
      )
    );

    productList.forEach((product) => {
      currentOrderDetail.temp_product.forEach((item) => {
        let number = product.number;
        if (item.product_id === product.id && number > 0) {
          number = number - 1;
        }
      });
    });
    setOrderDone(true);
  };

  const handleShowInfo = () => {
    setShowInfo(!showInfo);
  };

  return (
    <div className={cx("wrapper", "grid wide")}>
      {orderDone ? (
        <OrderDone
          currentOrderDetail={currentOrderDetail}
          productList={productList}
          totalMoney={totalMoney}
          note={tempNote.note}
          createOrder={date}
        />
      ) : (
        <div className={cx("row")}>
          <div className={cx("col l-6 m-12 c-12", "main")}>
            <div className={cx("main-header")}>
              <h1>COLKIDSCLUBVN</h1>
              <HeaderPage title="Phương thức thanh toán" />
            </div>
            <div className="row">
              <div className={cx("col l-0 m-12 c-12", "mobile")}>
                <div className={cx("display_info", "col", "l-0", "m-6", "c-6")}>
                  <CartIcon width="2.3rem" height="2.3rem" />
                  {!showInfo ? (
                    <p>Hiển thị thông tin đơn hàng</p>
                  ) : (
                    <p>Ẩn thông tin đơn hàng</p>
                  )}
                  <span onClick={handleShowInfo}>
                    <ion-icon name="chevron-down-outline"></ion-icon>
                  </span>
                </div>
                {showInfo ? (
                  currentOrderDetail.temp_product.map((item, index) => {
                    let prd_name = "";
                    let imgFront = "";
                    let prices = "";

                    productList.forEach((product) => {
                      const check = product.id === item.product_id;
                      if (check) {
                        imgFront = product.imgFront;
                        prd_name = product.name;
                        prices = product.prices;
                      }
                    });
                    totalMoney += prices * item.number;
                    return (
                      <div className={cx("row", "prd-info")} key={index}>
                        <div className={cx("col m-2 c-2", "prd-img-wrapper")}>
                          <div className={cx("prd-img")}>
                            <Images src={imgFront} />
                          </div>
                          <span className={cx("prd-quantity")}>
                            {item.number}
                          </span>
                        </div>
                        <div className={cx("col m-7 c-7", "prd-desc")}>
                          <span className={cx("prd-name")}>{prd_name}</span>
                          <span className={cx("prd-size")}>
                            Size: {item.size}
                          </span>
                          <span>
                            Màu: &nbsp;
                            <span
                              style={{
                                backgroundColor: `${item.color}`,
                                padding: "3px 10px",
                                borderRadius: "50%",
                              }}
                            ></span>
                          </span>
                        </div>
                        <div className={cx("col m-3 c-3", "prd-price")}>
                          <span>{VndFormat(prices * item.number)}</span>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <></>
                )}
                {showInfo ? (
                  <div className={cx("prd-total", "col", "m-12", "c-12")}>
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
                            <span>{VndFormat(totalMoney)}</span>
                          </td>
                        </tr>

                        <tr className={cx("total-line")}>
                          <td>Phí vận chuyển</td>
                          <td>
                            <span className={cx("order-summary-emphasis")}>
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
                            <span className={cx("payment-due-currency")}>
                              VND
                            </span>
                            <span className={cx("payment-due-price")}>
                              {VndFormat(totalMoney)}
                            </span>
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                ) : (
                  <></>
                )}
                {/* <div
                  className={cx("col", "l-0", "m-6")}
                  style={{ height: "100%" }}
                >
                  <div
                    className={cx("payment-due-price")}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      height: "100%",
                    }}
                  >
                    {VndFormat(totalMoney)}
                  </div>
                </div> */}
              </div>
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
                      <Images src="khongcogi" />
                    </div>
                    <p
                      className={cx("logged-in-customer-information-paragraph")}
                    >
                      {name} ({email})
                      <br />
                      <a href="#!" onClick={handleLogout}>
                        Đăng xuất
                      </a>
                    </p>
                  </div>

                  {confirmLogout ? (
                    <Logout setConfirmLogout={setConfirmLogout} />
                  ) : (
                    <></>
                  )}

                  <div className={cx("fieldset")}>
                    <div className={cx("field")}>
                      <div className={cx("field-input-wrapper")}>
                        <label
                          className={cx("field-label")}
                          htmlFor="billing_address_full_name"
                        >
                          Địa chỉ
                        </label>
                        <input
                          placeholder="Địa chỉ"
                          autoCapitalize="off"
                          spellCheck="false"
                          readOnly
                          className={cx("field-input")}
                          size="30"
                          type="text"
                          id="address"
                          name="address"
                          defaultValue={address ? address : ""}
                          autoComplete="false"
                        />
                      </div>
                    </div>

                    <div className={cx("field")}>
                      <div className={cx("field-input-wrapper")}>
                        <label
                          className={cx("field-label")}
                          htmlFor="billing_address_full_name"
                        >
                          Họ và tên
                        </label>
                        <input
                          placeholder="Họ và tên"
                          autoCapitalize="off"
                          spellCheck="false"
                          readOnly
                          className={cx("field-input")}
                          size="30"
                          type="text"
                          id="billing_address_full_name"
                          name="billing_address[full_name]"
                          defaultValue={name ? name : ""}
                          autoComplete="false"
                        />
                      </div>
                    </div>

                    <div className={cx("field")}>
                      <div className={cx("field-input-wrapper")}>
                        <label
                          className={cx("field-label")}
                          htmlFor="billing_address_phone"
                        >
                          Số điện thoại
                        </label>
                        <input
                          autoComplete="false"
                          placeholder="Số điện thoại"
                          readOnly
                          autoCapitalize="off"
                          spellCheck="false"
                          className={cx("field-input")}
                          size="30"
                          maxLength="15"
                          type="tel"
                          id="billing_address_phone"
                          name="billing_address[phone]"
                          defaultValue={phoneNumber ? phoneNumber : ""}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={cx("section")}>
                <div className={cx("section-header")}>
                  <h2>Phương thức thanh toán</h2>
                </div>
                <input
                  type="radio"
                  id="payment_normal"
                  name="payment_normal"
                  value="payment_normal"
                  defaultChecked
                />
                <label htmlFor="payment_normal" style={{ margin: " 0 10px" }}>
                  Thanh toán khi nhận hàng
                </label>
              </div>
              <div className={cx("footer", "row")}>
                <button
                  className={cx("btn-payment", "col c-12")}
                  onClick={handlePayment}
                >
                  Xác nhận đặt hàng
                </button>
                <Link
                  to={"/cart"}
                  className="col c-12"
                  style={{ color: "var(--primary)" }}
                >
                  Giỏ hàng
                </Link>
              </div>
            </div>
          </div>
          <div className={cx("col l-6 m-0 c-0")}>
            <div className={cx("sidebar-content")}>
              {currentOrderDetail.temp_product.map((item, index) => {
                let prd_name = "";
                let imgFront = "";
                let prices = "";

                productList.forEach((product) => {
                  const check = product.id === item.product_id;
                  if (check) {
                    imgFront = product.imgFront;
                    prd_name = product.name;
                    prices = product.prices;
                  }
                });
                totalMoney += prices * item.number;
                return (
                  <div className={cx("row", "prd-info")} key={index}>
                    <div className={cx("col l-2", "prd-img-wrapper")}>
                      <div className={cx("prd-img")}>
                        <Images src={imgFront} />
                      </div>
                      <span className={cx("prd-quantity")}>{item.number}</span>
                    </div>
                    <div className={cx("col l-7", "prd-desc")}>
                      <span className={cx("prd-name")}>{prd_name}</span>
                      <span className={cx("prd-size")}>Size: {item.size}</span>
                      <span>
                        Màu: &nbsp;
                        <span
                          style={{
                            backgroundColor: `${item.color}`,
                            padding: "3px 10px",
                            borderRadius: "50%",
                          }}
                        ></span>
                      </span>
                    </div>
                    <div className={cx("col l-3", "prd-price")}>
                      <span>{VndFormat(prices * item.number)}</span>
                    </div>
                  </div>
                );
              })}
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
                        <span>{VndFormat(totalMoney)}</span>
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
                          {VndFormat(totalMoney)}
                        </span>
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Payment;
