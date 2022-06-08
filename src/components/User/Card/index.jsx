import React, { useState } from "react";
import { faTimesCircle } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import classnames from "classnames/bind";
import styles from "./Card.module.scss";
import { CardIcon } from "~/components/Icons";
import Button from "~/components/Button";
import { Link } from "react-router-dom";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const cx = classnames.bind(styles);

function Card(props) {
  const { setShowCard } = props;

  const handelClose = () => {
    setShowCard(false);
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("header")}>
        <p className={cx("title")}>Giỏ hàng</p>
        <div className={cx("close")}>
          <FontAwesomeIcon icon={faTimesCircle} onClick={handelClose} />
        </div>
      </div>
      <div className={cx("cart-info")}>
        <div className={cx("cart-empty")}>
          <div className={cx("cart-icon")}>
            <CardIcon width="5rem" height="5rem" />
          </div>
          <p className={cx("note")}>Hiện chưa có sản phẩm</p>
        </div>
        <div className={cx("produsts")}>
          <div className={cx("product-img")}>
            <img
              src="https://product.hstatic.net/200000436739/product/0db50047-70f4-4bc3-8e1e-9a48be0e49b0_a207335ee455425d9ebca682512e962b_grande.jpeg"
              alt="a"
            />
          </div>
          <div className={cx("product-info")}>
            <Link className={cx("name")} to="/">
              ABC
            </Link>
            <span>
              <FontAwesomeIcon icon={faXmark} />
            </span>
            <div className={cx("size")}>Size M</div>
            <div className={cx("footer")}>
              <p className={cx("num")}>1</p>
              <span className={cx("prices")}>320000</span>
            </div>
          </div>
        </div>
      </div>
      <div className={cx("payment")}>
        <div className={cx("total")}>
          <p className={cx("title")}>Tổng tiền:</p>
          <p className={cx("cost")}>0đ</p>
        </div>
        <div className={cx("button")}>
          <Button>Xem giỏ hàng</Button>
          <Button>Thanh toán</Button>
        </div>
      </div>
    </div>
  );
}

export default Card;
