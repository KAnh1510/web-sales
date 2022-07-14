import styles from "./Payment.module.scss";
import classnames from "classnames/bind";
import HeaderPage from "~/layout/components/HeaderPage";
import Images from "~/components/Images";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getOrders, updateOrder } from "../Cart/OrderSlice";
import { getAllUsers } from "~/components/User/UserSlice";
import { getAllOrderDetail } from "../Cart/OrderDetailSlice";
import Logout from "~/components/User/Logout";
import VndFormat from "~/components/VndFormat/VndFormat";
import { getAllProducts } from "~/components/Collections/Products/ProductSlice";
import { getAuthUser } from "~/components/User/AuthSlice";
import OrderDone from "~/components/OrderDone";
import StorageKeys from "~/constant/storage-keys";

const cx = classnames.bind(styles);

function Payment() {
  const dispatch = useDispatch();
  let date = new Date().toLocaleDateString();
  const authUser = JSON.parse(localStorage.getItem(StorageKeys.user));
  const userList = useSelector((state) => state.users.values);
  const orderDetail = useSelector((state) => state.order_detail.values);
  const productList = useSelector((state) => state.products.values);
  const currentOrder = useSelector((state) => state.orders.values);

  const [confirmLogout, setConfirmLogout] = useState(false);
  const [confirmOrder, setConfirmOrder] = useState(false);
  const [orderDone, setOrderDone] = useState(false);
  let totalMoney = 0;

  const handleLogout = () => {
    setConfirmLogout(true);
  };

  const valueAuthUser = { ...authUser[0] };

  const currentUser = userList.filter(
    (item) => item.id === valueAuthUser.user_id
  );

  const currentOrderDetail = orderDetail.filter(
    (item) => item.user_id === valueAuthUser.user_id
  );

  const { name, address, email, phoneNumber } = currentUser[0];
  const [valueCurrentUser, setValueCurrentUser] = useState({
    name,
    address,
    email,
    phoneNumber,
  });

  const temp = currentOrder.filter(
    (item) => item.user_id === valueAuthUser.user_id
  );
  const valueOrder = temp.slice(0, 1);

  useEffect(() => {
    dispatch(getAllUsers());
    dispatch(getAllOrderDetail());
    dispatch(getAllProducts());
    dispatch(getOrders());
  }, [dispatch]);

  const handlePayment = () => {
    dispatch(
      updateOrder({
        id: valueOrder[0].id,
        data: { order: "done", create_at: date },
      })
    );
    setConfirmOrder(true);
    setOrderDone(true);
  };

  return (
    <div className={cx("wrapper", "grid")}>
      {orderDone ? (
        <OrderDone
          valueOrder={valueOrder}
          valueCurrentUser={valueCurrentUser}
          currentOrderDetail={currentOrderDetail}
          productList={productList}
          totalMoney={totalMoney}
        />
      ) : (
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
                      <Images src="khongcogi" />
                    </div>
                    <p
                      className={cx("logged-in-customer-information-paragraph")}
                    >
                      {valueCurrentUser.name} ({valueCurrentUser.email})
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
                          for="billing_address_full_name"
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
                          value={valueCurrentUser.address}
                          onChange={(e) =>
                            setValueCurrentUser({
                              ...valueCurrentUser,
                              address: e.target.value,
                            })
                          }
                          autoComplete="false"
                        />
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
                          autoCapitalize="off"
                          spellCheck="false"
                          readOnly
                          className={cx("field-input")}
                          size="30"
                          type="text"
                          id="billing_address_full_name"
                          name="billing_address[full_name]"
                          value={valueCurrentUser.name}
                          onChange={(e) =>
                            setValueCurrentUser({
                              ...valueCurrentUser,
                              name: e.target.value,
                            })
                          }
                          autoComplete="false"
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
                          value={valueCurrentUser.phoneNumber}
                          onChange={(e) =>
                            setValueCurrentUser({
                              ...valueCurrentUser,
                              phoneNumber: e.target.value,
                            })
                          }
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
                <label for="payment_normal" style={{ margin: " 0 10px" }}>
                  Thanh toán khi nhận hàng
                </label>
              </div>
              <div className={cx("footer")}>
                <Link to={"/cart"}>Giỏ hàng</Link>
                {confirmOrder ? (
                  <button
                    className={cx("btn-payment")}
                    style={{ backgroundColor: "green" }}
                  >
                    Đặt hàng thành công
                  </button>
                ) : (
                  <button className={cx("btn-payment")} onClick={handlePayment}>
                    Xác nhận đặt hàng
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className={cx("col l-6")}>
            <div className={cx("sidebar-content")}>
              {currentOrderDetail.map((item) => {
                let name = "";
                let imgFront = "";
                let prices = "";

                productList.forEach((product) => {
                  const check = product.id === item.product_id;
                  if (check) {
                    imgFront = product.imgFront;
                    name = product.name;
                    prices = product.prices;
                  }
                });
                totalMoney += prices * item.number;
                return (
                  <div className={cx("row", "prd-info")} key={item.id}>
                    <div className={cx("col l-2", "prd-img-wrapper")}>
                      <div className={cx("prd-img")}>
                        <Images src={imgFront} />
                      </div>
                      <span className={cx("prd-quantity")}>{item.number}</span>
                    </div>
                    <div className={cx("col l-7", "prd-desc")}>
                      <span className={cx("prd-name")}>{name}</span>
                      <span className={cx("prd-size")}>{item.size}</span>
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
