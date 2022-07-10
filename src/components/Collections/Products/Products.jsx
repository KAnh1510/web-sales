import React, { useEffect, useState } from "react";
import { Link, NavLink, useParams, useNavigate } from "react-router-dom";
import styles from "./Products.module.scss";
import classnames from "classnames/bind";

import User from "~/components/User";
import Images from "~/components/Images";
import ShowListProduct from "../ShowListProduct";
import ZoomIn from "../ZoomIn";
import Button from "~/components/Button";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "./ProductSlice";
import { getAllCollections } from "../CollectionSlice";
import { getAuthUser } from "~/components/User/AuthSlice";
import { createOrder, getOrders } from "~/pages/Cart/OrderSlice";
import { createOrderDetail } from "~/pages/Cart/OrderDetailSlice";

const cx = classnames.bind(styles);

export default function Products() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { productName } = useParams();
  let date = new Date().toLocaleDateString();

  const [size, setSize] = useState();
  const [color, setColor] = useState();
  const [counter, setCounter] = useState(1);
  const [messSuccess, setMessSuccess] = useState(false);
  const [messErr, setMessErr] = useState(false);

  const productList = useSelector((state) => state.products.values);
  const collectionList = useSelector((state) => state.collections.values);
  const currentUser = useSelector((state) => state.auth.values);

  const currentProduct = productList.filter(
    (item) => item.name === productName
  );
  let type = "";
  const valueUser = { ...currentUser[0] };
  const valueProduct = { ...currentProduct[0] };

  useEffect(() => {
    dispatch(getAllProducts(productName));
    dispatch(getAllCollections());
    dispatch(getAuthUser());
  }, []);

  const handleAddCard = (e) => {
    e.preventDefault();
    if (currentUser.length > 0) {
      dispatch(
        createOrder({
          user_id: valueUser.user_id,
          note: "",
          create_at: date,
        })
      );
      dispatch(
        createOrderDetail({
          user_id: valueUser.user_id,
          product_id: valueProduct.id,
          number: counter,
          color: color,
          size: size,
        })
      );
      setMessSuccess(true);
    } else {
      setMessErr(true);
    }
  };

  return (
    <div className={cx("grid")}>
      <div className={cx("user")}>
        <User />
      </div>
      {currentProduct.map((product) => {
        collectionList.forEach((collection) => {
          if (product.collection_id === collection.id) {
            type = collection.title;
          }
        });
        return (
          <div key={product.id} className={cx("wrapper")}>
            <div className={cx("header")}>
              <span>
                <Link to="/">Trang chủ</Link>
                <span>&nbsp;&nbsp;/&nbsp;&nbsp;</span>
              </span>
              <span
                className={cx("header_type")}
                onClick={() => {
                  navigate(`/collections/${type}`);
                }}
              >
                {" "}
                {type} &nbsp;&nbsp;/&nbsp;&nbsp;
              </span>
              <span> {productName}</span>
            </div>
            <div className={cx("content", "row")}>
              <div className={cx("col", "l-1")}>
                <div className={cx("gallery")}>
                  {product.gallery.map((item, index) => (
                    <div key={index} className={cx("gallery-item")}>
                      <NavLink
                        className={({ isActive }) =>
                          isActive ? cx("active") : " "
                        }
                        to={``}
                      >
                        <Images src={item.src} />
                      </NavLink>
                    </div>
                  ))}
                </div>
              </div>
              <div className={cx("main-img", "col", "l-7")}>
                <ZoomIn props={product.gallery} />
              </div>

              <div className={cx("col", "l-4")}>
                <div className={cx("product_info")}>
                  <div className={cx("product_title")}>
                    <h1>{productName}</h1>
                    <p>SKU: {product.subtle}</p>
                  </div>

                  <div className={cx("product_prices")}>
                    <p>
                      {product.prices.toLocaleString("vi", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </p>
                  </div>

                  <form>
                    <div className={cx("product_color")}>
                      {product.color &&
                        product.color.map((item, index) => (
                          <div className={cx("color_element")} key={index}>
                            <input
                              type="radio"
                              id={`swatch-${item.idColor}`}
                              name={`option${item.idColor}`}
                              value={item.idColor}
                              onChange={(e) => setColor(e.target.value)}
                              checked={color === item.idColor}
                            />
                            <label htmlFor={`swatch-${item.idColor}`}>
                              <span
                                style={{ background: `${item.idColor}` }}
                              ></span>
                            </label>
                          </div>
                        ))}
                    </div>

                    <div className={cx("product_size")}>
                      <div className={cx("select_size")}>
                        {product.size.map((item, index) => (
                          <div className={cx("size_element")} key={index}>
                            <input
                              type="radio"
                              id={`swatch-${item.name}`}
                              name={`option${item.name}`}
                              value={item.name}
                              onChange={(e) => setSize(e.target.value)}
                              checked={size === item.name}
                            />
                            <label htmlFor={`swatch-${item.name}`}>
                              <span>SIZE {item.name}</span>
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </form>

                  <div className={cx("selector_action")}>
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
                    <div className={cx("add-card")}>
                      <Button onClick={handleAddCard}>Thêm vào giỏ hàng</Button>
                    </div>
                  </div>

                  {messErr ? (
                    <p style={{ marginTop: "10px", color: "red" }}>
                      Bạn chưa đăng nhập, vui lòng đăng nhập để thêm sản phẩm!
                    </p>
                  ) : (
                    <></>
                  )}

                  {messSuccess ? (
                    <p style={{ marginTop: "10px", color: "blue" }}>
                      Sản phẩm đã được thêm vào giỏ hàng!
                    </p>
                  ) : (
                    <></>
                  )}

                  <div className={cx("desc")}>
                    <h2>Mô Tả</h2>
                    <p>Lorem Ipsum</p>
                  </div>
                </div>
              </div>
            </div>

            <div className={cx("row")}>
              <div className={cx("title", "col", "l-12")}>
                <h2>Sản phẩm liên quan</h2>
              </div>
              <div className={cx("content", "row")}>
                {productList.map(
                  (item) =>
                    product.collection_id === item.collection_id && (
                      <div key={item.id} className={cx("col", "l-2-4")}>
                        <ShowListProduct item={item} />
                      </div>
                    )
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
