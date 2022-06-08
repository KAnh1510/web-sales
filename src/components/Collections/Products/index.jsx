import React, { useEffect, useState } from "react";
import { Link, NavLink, useParams, useNavigate } from "react-router-dom";
import styles from "./Products.module.scss";
import classnames from "classnames/bind";

import User from "~/components/User";
import Images from "~/components/Images";
import { PRODUCTS } from "~/data";
import ShowListProduct from "../ShowListProduct";
import ZoomIn from "../ZoomIn";
import Button from "~/components/Button";

const cx = classnames.bind(styles);

export default function Products() {
  const { productName } = useParams();
  const [currentProduct, setCurrentProduct] = useState([]);
  const [size, setSize] = useState();
  const [color, setColor] = useState();
  const [counter, setCounter] = useState(1);
  const navigate = useNavigate();

  const getCurrentProduct = (product) => {
    const currentProduct = PRODUCTS.filter((item) => item.name === product);
    setCurrentProduct(currentProduct);
  };

  useEffect(() => {
    getCurrentProduct(productName);
  }, [productName]);

  return (
    <div className={cx("grid")}>
      <div className={cx("user")}>
        <User />
      </div>
      {currentProduct.map((product) => (
        <div key={product.id} className={cx("wrapper")}>
          <div className={cx("header")}>
            <span>
              <Link to="/">Trang chủ</Link>
              <span>&nbsp;&nbsp;/&nbsp;&nbsp;</span>
            </span>
            <span
              className={cx("header_type")}
              onClick={() => {
                navigate(`/collections/${product.type}`);
              }}
            >
              {" "}
              {product.type} &nbsp;&nbsp;/&nbsp;&nbsp;
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

                <form method="post" action="/">
                  <div className={cx("product_color")}>
                    {product.color &&
                      product.color.map((item, index) => (
                        <div className={cx("color_element")} key={index}>
                          <input
                            type="radio"
                            id={`swatch-${item.name}`}
                            name={`option${item.name}`}
                            value={item.name}
                            onChange={(e) => setColor(e.target.value)}
                            checked={color === item.name}
                          />
                          <label htmlFor={`swatch-${item.name}`}>
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
                    <Button>Thêm vào giỏ hàng</Button>
                  </div>
                </div>

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
              {PRODUCTS.map(
                (item) =>
                  product.type === item.type && (
                    <div key={item.id} className={cx("col", "l-2-4")}>
                      <ShowListProduct item={item} />
                    </div>
                  )
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
