import React, { useEffect, useState } from "react";
import classnames from "classnames/bind";
import { Link, useNavigate } from "react-router-dom";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";

import styles from "./Cart.module.scss";
import HeaderPage from "~/layout/components/HeaderPage";
import Button from "~/components/Button";
import VndFormat from "~/components/VndFormat/VndFormat";
import StorageKeys from "~/constant/storage-keys";
import { getAllProducts } from "../Products/ProductSlice";

const cx = classnames.bind(styles);

function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentOrderDetail = JSON.parse(
    localStorage.getItem(StorageKeys.orderDetail)
  );
  const currentUser = JSON.parse(localStorage.getItem(StorageKeys.user));
  const productList = useSelector((state) => state.products.values);
  const [note, setNote] = useState("");

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  const handleToPayment = () => {
    localStorage.setItem(
      StorageKeys.noteOrder,
      JSON.stringify({
        note: note,
      })
    );
    navigate("/cart/payment");
  };

  const handleDeleteProduct = (id) => {
    currentOrderDetail
      ? (currentOrderDetail.temp_product =
          currentOrderDetail.temp_product.filter((item) => item.id !== id))
      : (currentOrderDetail.temp_product = []);

    localStorage.setItem(
      StorageKeys.orderDetail,
      JSON.stringify({
        id: Math.floor(Math.random(100) * 100) + 1,
        user_id: currentUser.user_id,
        temp_product: currentOrderDetail.temp_product,
      })
    );
  };

  let total = 0;

  return (
    <>
      <HeaderPage title={"Giỏ hàng"} />
      <div className={cx("wrapper", "grid")}>
        <div className={cx("row")}>
          <div className={cx("col l-12 m-12 c-12", "header")}>
            <h1>Giỏ hàng của bạn</h1>
          </div>
        </div>

        <div className={cx("row")}>
          <div className={cx("col l-8 m-8")}>
            {currentOrderDetail
              ? currentOrderDetail.temp_product.map((item, index) => {
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
                  total += prices * item.number;

                  return (
                    <div className={cx("row", "info-prd")} key={index}>
                      <div className={cx("col l-2 m-4")}>
                        <Link to={`product/${name}`} className={cx("img-prd")}>
                          <img src={imgFront} alt={name} />
                        </Link>
                      </div>
                      <div className={cx("col l-10 m-8")}>
                        <div className={cx("info-text")}>
                          <div className={cx("name-prd")}>
                            <h3>{name}</h3>
                            <FontAwesomeIcon
                              icon={faTimes}
                              onClick={() => {
                                handleDeleteProduct(item.id);
                              }}
                            />
                          </div>
                          <p className={cx("prices")}>{VndFormat(prices)}</p>
                          {item.color ? (
                            <div
                              className={cx("color")}
                              style={{
                                display: "inline-block",
                                margin: "10px 0",
                                fontSize: "1.4rem",
                              }}
                            >
                              Màu:
                              <span
                                style={{
                                  background: `${item.color}`,
                                  marginLeft: "10px",
                                  padding: "0px 8px",
                                  border: "1px solid #000000",
                                  borderRadius: "50%",
                                }}
                              ></span>
                            </div>
                          ) : (
                            <></>
                          )}

                          <p className={cx("size")}>{item.size}</p>
                          <p>
                            Số lượng:{" "}
                            <span style={{ color: "red", fontWeight: "600" }}>
                              {item.number}{" "}
                            </span>
                            sản phẩm
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })
              : ""}

            <div className={cx("row")}>
              <div className={cx("col l-5 m-12 c-12")}>
                <div className={cx("note")}>
                  <h4 className={cx("title")}>Ghi chú đơn hàng</h4>
                  <div className={cx("checkout-note")}>
                    <textarea
                      placeholder="Ghi chú"
                      type="text"
                      id="note"
                      value={note}
                      name="note"
                      onChange={(e) => setNote(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className={cx("col l-4 m-4 c-12")}>
                <div className={cx("sidebox-order")}>
                  <div className={cx("sidebox-order-inner")}>
                    <div className={cx("sidebox-order_title")}>
                      <h3>Thông tin đơn hàng</h3>
                    </div>
                    <div className={cx("sidebox-order_total")}>
                      <p>
                        Tổng tiền:
                        <span className={cx("total-price")}>
                          {VndFormat(total)}
                        </span>
                      </p>
                    </div>
                    <div className={cx("sidebox-order_text")}>
                      <p>
                        Phí vận chuyển sẽ được tính ở trang thanh toán.
                        <br />
                        Bạn cũng có thể nhập mã giảm giá ở trang thanh toán.
                      </p>
                    </div>
                    <div className={cx("sidebox-order_action")}>
                      <Button
                        className={cx("btncart-checkout")}
                        onClick={handleToPayment}
                      >
                        Thanh toán
                      </Button>
                      <p className={cx("link-continue")}>
                        <Link to="/collections/All">
                          <ion-icon name="arrow-undo-outline"></ion-icon>
                          Tiếp tục mua hàng
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className={cx("col l-7 m-12 c-12")}>
                <div className={cx("policy")}>
                  <h4 className={cx("title")}>Chính sách mua hàng</h4>
                  <ul>
                    <li>Sản phẩm được đổi 1 lần duy nhất, không hỗ trợ trả.</li>
                    <li>Sản phẩm còn đủ tem mác, chưa qua sử dụng.</li>
                    <li>
                      Sản phẩm nguyên giá được đổi trong 30 ngày trên toàn hệ
                      thống.
                    </li>
                    <li>
                      Sản phẩm sale chỉ hỗ trợ đổi size (nếu cửa hàng còn) trong
                      7 ngày trên toàn hệ thống.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className={cx("col l-4 m-4 c-0")}>
            <div className={cx("sidebox-order")}>
              <div className={cx("sidebox-order-inner")}>
                <div className={cx("sidebox-order_title")}>
                  <h3>Thông tin đơn hàng</h3>
                </div>
                <div className={cx("sidebox-order_total")}>
                  <p>
                    Tổng tiền:
                    <span className={cx("total-price")}>
                      {VndFormat(total)}
                    </span>
                  </p>
                </div>
                <div className={cx("sidebox-order_text")}>
                  <p>
                    Phí vận chuyển sẽ được tính ở trang thanh toán.
                    <br />
                    Bạn cũng có thể nhập mã giảm giá ở trang thanh toán.
                  </p>
                </div>
                <div className={cx("sidebox-order_action")}>
                  <Button
                    className={cx("btncart-checkout")}
                    onClick={handleToPayment}
                  >
                    Thanh toán
                  </Button>
                  <p className={cx("link-continue")}>
                    <Link to="/collections/All">
                      <ion-icon name="arrow-undo-outline"></ion-icon>
                      Tiếp tục mua hàng
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cart;
