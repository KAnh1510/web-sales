import PropTypes from "prop-types";
import React from "react";
import styles from "./OrderDone.module.scss";
import classnames from "classnames/bind";
import Images from "../Images";
import VndFormat from "../VndFormat/VndFormat";
import { Link } from "react-router-dom";

const cx = classnames.bind(styles);

const OrderDone = ({
  valueCurrentUser,
  currentOrderDetail,
  productList,
  totalMoney,
  valueOrder,
}) => {
  return (
    <div style={{ margin: "20px 0" }}>
      <h1 className={cx("header")}>Đơn hàng của bạn</h1>
      {valueOrder ? (
        <>
          <div className="row">
            <div className="col l-6" style={{ padding: "0 100px" }}>
              <table
                className={cx("total-line-table")}
                style={{ margin: "20px 0" }}
              >
                <thead>
                  <tr>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr className={cx("total-line")}>
                    <td>Người nhận:</td>
                    <td>
                      <span>{valueCurrentUser.name}</span>
                    </td>
                  </tr>
                  <tr className={cx("total-line")}>
                    <td>Email:</td>
                    <td>
                      <span>{valueCurrentUser.email}</span>
                    </td>
                  </tr>
                  <tr className={cx("total-line")}>
                    <td>Số điện thoại:</td>
                    <td>
                      <span>{valueCurrentUser.phoneNumber}</span>
                    </td>
                  </tr>
                </tbody>
              </table>
              <p>Ghi chú:</p>
              <textarea
                type="text"
                value={valueCurrentUser.note}
                id="note"
                rows="3"
                style={{ outline: "none" }}
              ></textarea>
              <p>Thời gian đặt:{valueCurrentUser.create_at} </p>
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
                        <span className={cx("prd-quantity")}>
                          {item.number}
                        </span>
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
        </>
      ) : (
        <div>
          <h2>Bạn chưa có đơn hàng nào.</h2>
          <p style={{ margin: "30px 0" }}>
            <Link to="/collections/All">
              <ion-icon
                name="arrow-undo-outline"
                style={{ margin: "0 10px" }}
              ></ion-icon>
              Tiếp tục mua hàng
            </Link>
          </p>
        </div>
      )}
    </div>
  );
};

OrderDone.propTypes = {
  valueCurrentUser: PropTypes.object,
  currentOrderDetail: PropTypes.array,
  productList: PropTypes.array,
  totalMoney: PropTypes.number,
  valueOrder: PropTypes.object,
};
export default OrderDone;
