import React, { useEffect, useState } from "react";
import styles from "./Cart.module.scss";
import classnames from "classnames/bind";
import HeaderPage from "~/layout/components/HeaderPage";
import Images from "~/components/Images";
import { Link, useNavigate } from "react-router-dom";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "~/components/Button";
import { useDispatch, useSelector } from "react-redux";
import { deleteOrderDetail, getAllOrderDetail } from "./OrderDetailSlice";
import { getAllProducts } from "~/components/Collections/Products/ProductSlice";
import VndFormat from "~/components/VndFormat/VndFormat";
import { getOrders, updateOrder } from "./OrderSlice";

const cx = classnames.bind(styles);

function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [note, setNote] = useState("");
  const productItem = useSelector((state) => state.order_detail.values);
  const productList = useSelector((state) => state.products.values);
  const currentOrder = useSelector((state) => state.orders.values);

  const valueOrder = { ...currentOrder[0] };

  useEffect(() => {
    dispatch(getAllOrderDetail());
    dispatch(getAllProducts());
    dispatch(getOrders());
  }, []);

  const handleToPayment = () => {
    dispatch(
      updateOrder({
        id: valueOrder.id,
        data: { note: note },
      })
    );
    navigate("/cart/payment");
  };

  const handleDeleteProduct = (id) => {
    dispatch(deleteOrderDetail({ id: id }));
  };

  let total = 0;

  return (
    <>
      <HeaderPage title={"Giỏ hàng"} />
      <div className={cx("wrapper", "grid")}>
        <div className={cx("row")}>
          <div className={cx("col l-12", "header")}>
            <h1>Giỏ hàng của bạn</h1>
            <p className={cx("count-cart")}>
              Có <span>1 sản phẩm</span> trong giỏ hàng
            </p>
          </div>
        </div>

        <div className={cx("row")}>
          <div className={cx("col l-8")}>
            {productItem.map((item, index) => {
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
                  <div className={cx("col l-2")}>
                    <Link to="product/name" className={cx("img-prd")}>
                      <Images src={imgFront} />
                    </Link>
                  </div>
                  <div className={cx("col l-10")}>
                    <div className={cx("info-text")}>
                      <div className={cx("name-prd")}>
                        <h3>{name}</h3>
                        <FontAwesomeIcon
                          icon={faTimes}
                          onClick={() => handleDeleteProduct(item.id)}
                        />
                      </div>
                      <p className={cx("prices")}>{VndFormat(prices)}</p>
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
                      <p className={cx("size")}>Size L</p>
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
            })}

            <div className={cx("row")}>
              <div className={cx("col l-5")}>
                <div className={cx("note")}>
                  <h4 className={cx("title")}>Ghi chú đơn hàng</h4>
                  <div className={cx("checkout-note")}>
                    <textarea
                      placeholder="Ghi chú"
                      id="note"
                      name="note"
                      rows="5"
                      onChange={(e) => setNote(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className={cx("col l-7")}>
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
          <div className={cx("col l-4")}>
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
