import React, { useEffect, useState } from "react";
import { Link, NavLink, useParams, useNavigate } from "react-router-dom";
import Slider from "react-slick";
import { useDispatch, useSelector } from "react-redux";
import classnames from "classnames/bind";

import styles from "./Products.module.scss";
import User from "~/components/User";
import Images from "~/components/Images";
import Button from "~/components/Button";
import { getAllProducts } from "./ProductSlice";
import StorageKeys from "~/constant/storage-keys";
import { getAllCollections } from "~/components/Collections/CollectionSlice";
import ZoomIn from "~/components/Collections/ZoomIn";
import ShowListProduct from "~/components/Collections/ShowListProduct";

const cx = classnames.bind(styles);

export default function Products() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { productName } = useParams();

  const [size, setSize] = useState();
  const [color, setColor] = useState();
  const [counter, setCounter] = useState(1);
  const [messSuccess, setMessSuccess] = useState(false);
  const [messErr, setMessErr] = useState(false);
  const [forgot, setForgot] = useState(false);

  const productList = useSelector((state) => state.products.values);
  const collectionList = useSelector((state) => state.collections.values);
  const currentUser = JSON.parse(localStorage.getItem(StorageKeys.user));
  const currentOrderDetail = JSON.parse(
    localStorage.getItem(StorageKeys.orderDetail)
  );

  const currentProduct = productList.filter(
    (item) => item.name === productName
  );
  let type = "";
  const valueProduct = { ...currentProduct[0] };

  useEffect(() => {
    dispatch(getAllProducts());
    dispatch(getAllCollections());
  }, [dispatch]);

  const handleAddCard = (e) => {
    e.preventDefault();
    if (size && color) {
      if (currentUser) {
        localStorage.setItem(
          StorageKeys.orders,
          JSON.stringify({
            id: Math.floor(Math.random(100) * 100) + 1,
            user_id: currentUser.user_id,
          })
        );

        if (!currentOrderDetail) {
          localStorage.setItem(
            StorageKeys.orderDetail,
            JSON.stringify({
              id: Math.floor(Math.random(100) * 100) + 1,
              temp_product: [
                {
                  id: Math.floor(Math.random(100) * 100 + 1),
                  product_id: valueProduct.id,
                  number: counter,
                  color: color,
                  size: size,
                },
              ],
            })
          );
        } else {
          currentOrderDetail.temp_product.push({
            id: Math.floor(Math.random(100) * 100 + 1),
            product_id: valueProduct.id,
            number: counter,
            color: color,
            size: size,
          });

          for (let i = 0; i < currentOrderDetail.temp_product.length; i++) {
            for (
              let j = i + 1;
              j < currentOrderDetail.temp_product.length;
              j++
            ) {
              if (
                currentOrderDetail.temp_product[i].product_id ===
                  currentOrderDetail.temp_product[j].product_id &&
                currentOrderDetail.temp_product[i].size ===
                  currentOrderDetail.temp_product[j].size &&
                currentOrderDetail.temp_product[i].color ===
                  currentOrderDetail.temp_product[j].color
              ) {
                currentOrderDetail.temp_product[i].number++;
                currentOrderDetail.temp_product.splice(j, 1);
              }
            }
          }

          localStorage.setItem(
            StorageKeys.orderDetail,
            JSON.stringify({
              id: Math.floor(Math.random(100) * 100) + 1,
              temp_product: currentOrderDetail.temp_product,
            })
          );
        }

        setMessSuccess(true);
      } else {
        setMessErr(true);
      }
    } else setForgot(true);
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
  };

  return (
    <div className={cx("grid")}>
      <div className={cx("user", "col", "m-0", "c-0")}>
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
              <div className={cx("col", "l-1", "m-0", "c-0")}>
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
              <div className={cx("main-img", "col", "l-7", "m-0", "c-0")}>
                <ZoomIn props={product.gallery} />
              </div>

              <div className={cx("col", "l-0", "m-2")}></div>
              <div
                className={cx("col", "l-0", "m-9", "c-12")}
                style={{ textAlign: "center" }}
              >
                <Slider {...settings}>
                  {product.gallery.map((item) => (
                    <Images src={item.src} className={cx("slick-item")} />
                  ))}
                </Slider>
              </div>

              <div className={cx("col", "l-4", "m-12", "c-12")}>
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
                              required
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
                              required
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

                  {forgot ? (
                    <p style={{ marginTop: "10px", color: "red" }}>
                      Bạn chưa chọn size hoặc màu.
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
                    -Chất liệu: thun cotton
                    <br />- Size:&nbsp;
                    {product.size.map((item, index) => (
                      <span key={index}> {item.name}</span>
                    ))}
                    <br />- Màu sắc:{" "}
                    {product.color.map((item, index) => (
                      <span key={index}> {item.name_color}</span>
                    ))}
                    <br />
                    -Thiết kế độc đáo
                    <br />
                    - Dễ kết hợp với các trang phục và phụ kiện khác nhau.
                    <br />
                    _________________
                    <br />
                    Thông tin về Colkidsclub:
                    <br />
                    -Các sản phẩm do CND thiết kế và sản xuất
                    <br />- Sử dụng nguyên liệu vải, phụ kiện tốt sử dụng lâu
                    bền.
                    <br />
                    -Tất cả các sản phẩm bên CND đều đảm bảo như hình
                    <br />- Chất lượng sản phẩm tốt 100%
                    <br />- Giao hàng toàn quốc, nhận hàng rồi mới thanh toán
                    <br />
                    _________________
                    <br />
                    Lưu ý:các bạn vui lòng quay clip unboxing. Shop chỉ nhận đổi
                    trả sản phẩm khi bị lỗi hoặc giao nhầm sản phẩm (phải có
                    clip unboxing nhé) . Các bạn có thể đổi size trong vòng 3
                    ngày kể từ ngày nhận hàng
                    <br />
                    Chúc bạn có được những trải nghiệm thú vị và lựa chọn cho
                    mình được những sản phẩm ưng ý khi đến với CND.
                  </div>
                </div>
              </div>
            </div>

            <div className={cx("row")}>
              <div className={cx("title", "col", "l-12", "m-12", "c-12")}>
                <h2>Sản phẩm liên quan</h2>
              </div>
              <div className={cx("content", "row")}>
                {productList.map(
                  (item) =>
                    product.collection_id === item.collection_id && (
                      <div
                        key={item.id}
                        className={cx("col", "l-2-4", "m-6", "c-6")}
                      >
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
