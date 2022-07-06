import React, { startTransition, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import HeadlessTippy from "@tippyjs/react/headless";
import { faTimesCircle } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import classnames from "classnames/bind";

import styles from "./Search.module.scss";
import ProductItem from "~/components/Collections/ProductItem";
import { Wrapper } from "~/components/Popper";
import { SearchIcon } from "~/components/Icons";
import {
  getAllProducts,
  searchProductsByName,
} from "~/components/Collections/Products/ProductSlice";

const cx = classnames.bind(styles);

function Search({ setShowSearch }) {
  const [showResults, setShowResults] = useState(true);
  const [searchText, setSearchText] = useState();

  const inputRef = useRef();
  const typingTimeOurRef = useRef();
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.products.values);
  let searchResults = [];
  useEffect(() => {
    dispatch(getAllProducts());
  }, []);

  if (typingTimeOurRef.current) {
    clearTimeout(typingTimeOurRef.current);
  }

  typingTimeOurRef.current = setTimeout(() => {
    searchResults = productList.filter((product) => {
      return product.name.includes(searchText);
    });
  }, 500);

  console.log(searchResults);
  const handleSearchTextChange = (e) => {
    setSearchText(e.target.value);
    if (!setShowSearch) return;
  };

  const handelClose = () => {
    setShowSearch(false);
  };

  return (
    <>
      <div className={cx("header")}>
        <p className={cx("title")}>Tìm kiếm</p>
        <div className={cx("close")}>
          <FontAwesomeIcon icon={faTimesCircle} onClick={handelClose} />
        </div>
      </div>
      <HeadlessTippy
        interactive
        // visible={showResults && searchResults.length > 0}
        render={(attrs) => (
          <div className={cx("search-results")} tabIndex="-1" {...attrs}>
            <Wrapper>
              {/* {searchResults.map((result, index) => (
                <ProductItem key={index} data={result} />
              ))} */}
            </Wrapper>
          </div>
        )}
      >
        <div className={cx("search")}>
          <input
            ref={inputRef}
            type="text"
            value={searchText ?? ""}
            onChange={handleSearchTextChange}
            onFocus={() => setShowResults(true)}
            placeholder="Tìm kiếm sản phẩm..."
            size="20"
          />

          <button className={cx("search-btn")}>
            <SearchIcon />
          </button>
        </div>
      </HeadlessTippy>
    </>
  );
}

Search.propTypes = {
  setShowSearch: PropTypes.func,
};

export default Search;
