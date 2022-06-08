import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

import styles from "./Collection.module.scss";
import classnames from "classnames/bind";
import { PRODUCTS } from "~/data";
import ShowListProduct from "./ShowListProduct";
import AllProduct from "./AllProducts";

const cx = classnames.bind(styles);

export default function Collections() {
  const [collection, setCollection] = useState([]);
  const location = useLocation().pathname.split("/")[2];
  let params = useParams();

  const getCollection = (collection) => {
    const products = PRODUCTS.filter((item) => item.type === collection);
    setCollection(products);
  };

  useEffect(() => {
    getCollection(params.type);
  }, [params.type]);

  return (
    <div className={cx("grid")}>
      <div className={cx("row")}>
        {location === "all" ? (
          <AllProduct />
        ) : (
          collection.map((product) => {
            return (
              <div key={product.id} className={cx("col", "l-3")}>
                <ShowListProduct item={product} />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
