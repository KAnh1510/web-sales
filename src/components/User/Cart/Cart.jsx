import PropTypes from "prop-types";
import { faTimesCircle } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classnames from "classnames/bind";
import styles from "./Cart.module.scss";
import { CartIcon } from "~/components/Icons";
import Button from "~/components/Button";
import { Link, useNavigate } from "react-router-dom";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  deleteOrderDetail,
  getAllOrderDetail,
} from "~/pages/Cart/OrderDetailSlice";
import { getAllProducts } from "~/components/Collections/Products/ProductSlice";
import VndFormat from "~/components/VndFormat/VndFormat";
import { getAuthUser } from "../AuthSlice";

const cx = classnames.bind(styles);

function Cart({ setShowCart }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [cartEmpty, setCartEmpty] = useState(false);
  const authUser = useSelector((state) => state.auth.values);
  const productList = useSelector((state) => state.products.values);
  const orderDetail = useSelector((state) => state.order_detail.values);

  const valueAuthUser = { ...authUser[0] };
  const currentOrderDetail = orderDetail.filter(
    (item) => item.user_id === valueAuthUser.user_id
  );

  useEffect(() => {
    dispatch(getAuthUser());
    dispatch(getAllProducts());
    dispatch(getAllOrderDetail());

    if (currentOrderDetail.length > 0) {
      setCartEmpty(false);
    } else {
      setCartEmpty(true);
    }
  }, [dispatch, currentOrderDetail.length]);

  const handleDeleteProduct = (id) => {
    dispatch(deleteOrderDetail({ id: id }));
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
        ) : (
          currentOrderDetail.map((item, index) => {
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
