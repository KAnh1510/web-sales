import PropTypes from "prop-types";
import { faTimesCircle } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classnames from "classnames/bind";
import { Link, useNavigate } from "react-router-dom";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import styles from "./Cart.module.scss";
import { CartIcon } from "~/components/Icons";
import Button from "~/components/Button";
import VndFormat from "~/components/VndFormat/VndFormat";
import StorageKeys from "~/constant/storage-keys";
import { getAllProducts } from "~/pages/Products/ProductSlice";

const cx = classnames.bind(styles);

function Cart({ setShowCart }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [cartEmpty, setCartEmpty] = useState(false);

  const authUser = JSON.parse(localStorage.getItem(StorageKeys.user));
  const productList = useSelector((state) => state.products.values);
  const currentOrderDetail = JSON.parse(
    localStorage.getItem(StorageKeys.orderDetail)
  );

  useEffect(() => {
    dispatch(getAllProducts());

    if (currentOrderDetail && currentOrderDetail.temp_product.length > 0) {
      setCartEmpty(false);
    } else {
      setCartEmpty(true);
    }
  }, [dispatch]);

  const handleDeleteProduct = (id) => {
    currentOrderDetail
      ? (currentOrderDetail.temp_product =
          currentOrderDetail.temp_product.filter(
            (item) => item.product_id !== id
          ))
      : (currentOrderDetail.temp_product = []);

    localStorage.setItem(
      StorageKeys.orderDetail,
      JSON.stringify({
        id: Math.floor(Math.random(100) * 100) + 1,
        user_id: currentOrderDetail.user_id,
        temp_product: currentOrderDetail.temp_product,
      })
    );
  };

  const handelClose = () => {
    setShowCart(false);
  };
  let total = 0;

  return (
    <div className={cx("wrapper")}>
      <div className={cx("header")}>
        <p className={cx("title")}>Giỏ hàng</p>
        <div className={cx("close")}>
          <FontAwesomeIcon icon={faTimesCircle} onClick={handelClose} />
        </div>
      </div>
      <div className={cx("cart-info")}>
        {cartEmpty ? (
          <div className={cx("cart-empty")}>
            <div className={cx("cart-icon")}>
              <CartIcon width="5rem" height="5rem" />
            </div>
            <p className={cx("note")}>Hiện chưa có sản phẩm</p>
          </div>
        ) : currentOrderDetail ? (
          currentOrderDetail.temp_product.map((item, index) => {
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
              <div className={cx("produsts")} key={index}>
                <div className={cx("product-img")}>
                  <img src={imgFront} alt="a" />
                </div>
                <div className={cx("product-info")}>
                  <Link className={cx("name")} to={`/products/${name}`}>
                    {name}
                  </Link>
                  <span>
                    <FontAwesomeIcon
                      icon={faXmark}
                      onClick={() => handleDeleteProduct(item.id)}
                    />
                  </span>

                  {item.idColor ? (
                    <div
                      className={cx("color")}
                      style={{
                        display: "block",
                        margin: "10px 0",
                        fontSize: "1.4rem",
                      }}
                    >
                      Màu:
                      <span
                        style={{
                          background: `${item.idColor}`,
                          marginLeft: "10px",
                          width: "20px",
                          height: "20px",
                          border: "1px solid #000000",
                          borderRadius: "50%",
                        }}
                      ></span>
                    </div>
                  ) : (
                    <></>
                  )}

                  <div className={cx("size")}>Size {item.size}</div>
                  <div className={cx("footer")}>
                    <p className={cx("num")}>{item.number}</p>
                    <span className={cx("prices")}>{VndFormat(prices)}</span>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          " "
        )}
        <div className={cx("payment")}>
          <div className={cx("total")}>
            <p className={cx("title")}>Tổng tiền:</p>
            <p className={cx("cost")}>{VndFormat(total)}</p>
          </div>
          <div className={cx("button")}>
            <Button onClick={() => navigate("/cart")}>Xem giỏ hàng</Button>
            <Button
              onClick={() => {
                authUser.length > 0 && navigate("/cart/payment");
              }}
            >
              Thanh toán
            </Button>
          </div>
          <div className={cx("button")}>
            <Button
              onClick={() => {
                navigate("/orders");
              }}
            >
              Xem đơn hàng của bạn
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

Cart.propTypes = {
  setShowCart: PropTypes.func,
};

export default Cart;
