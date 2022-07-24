import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import classnames from "classnames/bind";

import styles from "./Collection.module.scss";
import ShowListProduct from "./ShowListProduct";
import { getAllCollections } from "./CollectionSlice";
import { getAllProducts } from "~/pages/Products/ProductSlice";

const cx = classnames.bind(styles);

export default function Collections() {
  const productList = useSelector((state) => state.products.values);
  const collectionList = useSelector((state) => state.collections.values);
  const dispatch = useDispatch();
  let params = useParams();

  useEffect(() => {
    dispatch(getAllCollections());
    dispatch(getAllProducts());
  }, [dispatch]);

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
                <div
                  key={product.id}
                  className={cx("col", "l-3", "m-6", "c-6")}
                >
                  <ShowListProduct item={product} />
                </div>
              );
            })
          : productCollection.map((product) => {
              return (
                <div
                  key={product.id}
                  className={cx("col", "l-3", "m-6", "c-6")}
                >
                  <ShowListProduct item={product} />
                </div>
              );
            })}

        <div className={cx("col", "l-12")}></div>
      </div>
    </div>
  );
}
