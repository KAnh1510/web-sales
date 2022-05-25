import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styles from "./Collection.module.scss";
import classnames from "classnames/bind";
import Images from "../Images";
import { PRODUCTS } from "~/data";
import ShowListProduct from "./ShowListProduct";

const cx = classnames.bind(styles);

export default function Collections() {
  const [collection, setCollection] = useState([]);

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
        {params.type === "all"
          ? PRODUCTS.map((product) => {
              return (
                <div key={product.id} className={cx("col", "l-3")}>
                  <ShowListProduct item={product} />
                </div>
              );
            })
          : collection.map((product) => {
              return (
                <div key={product.id} className={cx("col", "l-3")}>
                  <div className={cx("prd_img")}>
                    <Link
                      to={`/products/${product.name}`}
                      className={cx("img_link")}
                    >
                      <Images
                        src={product.img1}
                        alt={product.name}
                        className={cx("img_show")}
                      />
                      <Images
                        src={product.img2}
                        alt={product.name}
                        className={cx("img_hidden")}
                      />
                    </Link>
                  </div>
                  <div className={cx("prd_desc")}>
                    <Link to={`/products/${product.name}`}>{product.name}</Link>
                    <p className={cx("prd_price")}>{product.prices}</p>
                  </div>
                </div>
              );
            })}
      </div>
    </div>
  );
}
