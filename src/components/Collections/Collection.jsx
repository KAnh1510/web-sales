import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

import styles from "./Collection.module.scss";
import classnames from "classnames/bind";
import ShowListProduct from "./ShowListProduct";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "./Products/ProductSlice";
import { getAllCollections } from "./CollectionSlice";

const cx = classnames.bind(styles);

export default function Collections() {
  const location = useLocation().pathname.split("/")[2];
  const productList = useSelector((state) => state.products.values);
  const collectionList = useSelector((state) => state.collections.values);
  const dispatch = useDispatch();
  let params = useParams();

  useEffect(() => {
    dispatch(getAllCollections());
    dispatch(getAllProducts());
  }, []);

  const collectionItem = [];

  collectionList.filter((collection) =>
    params.type !== "All"
      ? collection.title === params.type && collectionItem.push(collection)
      : collection
  );

  const productCollection = productList.filter((product) =>
    params.type !== "All"
      ? product.collection_id === collectionItem[0].id && product
      : product
  );

  return (
    <div className={cx("grid")}>
      <div className={cx("row")}>
        {params.type === "All"
          ? productList.map((product) => {
              return (
                <div key={product.id} className={cx("col", "l-3")}>
                  <ShowListProduct item={product} />
                </div>
              );
            })
          : productCollection.map((product) => {
              return (
                <div key={product.id} className={cx("col", "l-3")}>
                  <ShowListProduct item={product} />
                </div>
              );
            })}

        <div className={cx("col", "l-12")}></div>
      </div>
    </div>
  );
}
