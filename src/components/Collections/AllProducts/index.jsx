import React from "react";
import { PRODUCTS } from "~/data";
import ShowListProduct from "../ShowListProduct";
import styles from "./AllProduct.module.scss";
import classnames from "classnames/bind";

const cx = classnames.bind(styles);
function AllProduct() {
  return (
    <div className={cx("grid")}>
      <div className={cx("row")}>
        {PRODUCTS.map((product) => {
          return (
            <div key={product.id} className={cx("col", "l-3")}>
              <ShowListProduct item={product} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default AllProduct;
