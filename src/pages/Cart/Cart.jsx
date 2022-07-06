import React, { useState } from "react";
import styles from "./Cart.module.scss";
import classnames from "classnames/bind";
import HeaderPage from "~/layout/components/HeaderPage";
import Images from "~/components/Images";
import { Link } from "react-router-dom";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "~/components/Button";

const cx = classnames.bind(styles);

function Cart() {
  const [counter, setCounter] = useState(1);

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
            <div className={cx("row", "info-prd")}>
              <div className={cx("col l-2")}>
                <Link to="product/name" className={cx("img-prd")}>
                  <Images src="https://product.hstatic.net/200000436739/product/a0ddcb1a-8a15-4b28-973e-baf6900b076e_50ba0323a16a41f19541ff86978f0a2b_medium.jpeg" />
                </Link>
              </div>
              <div className={cx("col l-10")}>
                <div className={cx("info-text")}>
                  <div className={cx("name-prd")}>
                    <h3>Name</h3>
                    <FontAwesomeIcon icon={faTimes} />
                  </div>
                  <p className={cx("prices")}>320000</p>
                  <p className={cx("size")}>Size L</p>
                  <form>
                    <div
                      className={cx("value-button", "decrease")}
                      onClick={() => {
                        counter > 1 ? setCounter(counter - 1) : setCounter(1);
                      }}
                      value="Decrease Value"
                    >
                      -
                    </div>
                    <input
                      type="number"
                      id="number"
                      value={counter}
                      onChange={(e) => setCounter(e.target.value)}
                      className={cx("number")}
                    />
                    <div
                      className={cx("value-button", "increase")}
                      onClick={() => setCounter(counter + 1)}
                      value="Increase Value"
                    >
                      +
                    </div>
                  </form>
                  <div className={cx("total-money")}>
                    <span>Tổng tiền:</span>
                    <span>320000</span>
                  </div>
                </div>
              </div>
            </div>
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
                    <span className={cx("total-price")}>320000</span>
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
                  <Button className={cx("btncart-checkout")}>Thanh toán</Button>
                  <p className={cx("link-continue")}>
                    <Link to="collection/all">
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
