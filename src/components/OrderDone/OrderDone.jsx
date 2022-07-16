import PropTypes from "prop-types";
import React, { useEffect } from "react";
import styles from "./OrderDone.module.scss";
import classnames from "classnames/bind";
import Images from "../Images";
import VndFormat from "../VndFormat/VndFormat";
import { Link } from "react-router-dom";
import StorageKeys from "~/constant/storage-keys";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../User/UserSlice";
import { getOrders } from "~/components/OrderDone/OrderSlice";
import { getOrderDetail } from "~/components/OrderDone/OrderDetailSlice";
import { getAllProducts } from "../Collections/Products/ProductSlice";

const cx = classnames.bind(styles);

const OrderDone = () => {
  const dispatch = useDispatch();
  const currentOrder = JSON.parse(localStorage.getItem(StorageKeys.orders));
  const currentOrderDetail = JSON.parse(
    localStorage.getItem(StorageKeys.orderDetail)
  );
  const valueOrder = useSelector((state) => state.orders.values);
  const valueOrderDetail = useSelector((state) => state.order_detail.values);
  const userList = useSelector((state) => state.users.values);
  const productList = useSelector((state) => state.products.values);

  const currentUser = userList.filter(
    (item) => item.id === currentOrder.user_id
  );
  const { name, email, address, phoneNumber } = { ...currentUser[0] };

  useEffect(() => {
    dispatch(getOrders(currentOrder.id));
    dispatch(getOrderDetail(currentOrderDetail.id));
    dispatch(getAllUsers());
    dispatch(getAllProducts());
  }, [dispatch]);

  let totalMoney = 0;

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
                      <span>{name}</span>
                    </td>
                  </tr>
                  <tr className={cx("total-line")}>
                    <td>Email:</td>
                    <td>
                      <span>{email}</span>
                    </td>
                  </tr>
                  <tr className={cx("total-line")}>
                    <td>Số điện thoại:</td>
                    <td>
                      <span>{phoneNumber}</span>
                    </td>
                  </tr>
                  <tr className={cx("total-line")}>
                    <td>Địa chỉ:</td>
                    <td>
                      <span>{address}</span>
                    </td>
                  </tr>
                </tbody>
              </table>
              <p>Ghi chú:</p>
              <textarea
                type="text"
                readOnly
                defaultValue={valueOrder.note}
                id="note"
                rows="4"
                style={{ outline: "none", padding: "10px" }}
              ></textarea>
              <p>Thời gian đặt: &nbsp;{valueOrder.create_at} </p>
            </div>
            <div className={cx("col l-6")}>
              <div className={cx("sidebar-content")}>
                {valueOrderDetail
                  ? valueOrderDetail.map((item, index) => {
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
                        <div className={cx("row", "prd-info")} key={index}>
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
                    })
                  : ""}

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
                            {totalMoney ? VndFormat(totalMoney) : ""}
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
  currentOrderDetail: PropTypes.object,
  productList: PropTypes.array,
  totalMoney: PropTypes.number,
  valueOrder: PropTypes.object,
};
export default OrderDone;
