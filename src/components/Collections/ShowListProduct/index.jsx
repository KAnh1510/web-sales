import React from "react";
import { Link } from "react-router-dom";
import Images from "~/components/Images";
import styles from "./ShowListProduct.module.scss";
import classnames from "classnames/bind";

const cx = classnames.bind(styles);
function ShowListProduct({ item }) {
  return (
    <>
      <div className={cx("prd_img")}>
        <Link to={`/products/${item.name}`} className={cx("img_link")}>
          <Images
            src={item.imgFront}
            alt={item.name}
            className={cx("img_show")}
          />
          <Images
            src={item.imgBack}
            alt={item.name}
            className={cx("img_hidden")}
          />
        </Link>
      </div>
      <div className={cx("prd_desc")}>
        <Link to={`/products/${item.name}`}>{item.name}</Link>
        <p className={cx("prd_price")}>{item.prices}</p>
      </div>
    </>
  );
}

export default ShowListProduct;
