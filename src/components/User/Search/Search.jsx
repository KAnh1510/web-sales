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
import { useDebounce } from "~/components/hooks";

const cx = classnames.bind(styles);

function Search({ setShowSearch }) {
  const [showResults, setShowResults] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const debouncedValue = useDebounce(searchText, 500);

  const inputRef = useRef();
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.products.values);

  useEffect(() => {
    if (!debouncedValue.trim()) {
      setSearchResults([]);
      return;
    }

    const results = productList.filter((product) => {
      return product.name.includes(debouncedValue);
    });
    setSearchResults(results);

    dispatch(getAllProducts());
  }, [debouncedValue]);

  const handleSearchTextChange = (e) => {
    const searchText = e.target.value;
    if (!searchText.startsWith(" ")) {
      setSearchText(searchText);
    }
    if (!setShowSearch) return;
  };

  const handelHideResults = () => {
    setShowResults(false);
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
        visible={showResults && searchResults.length > 0}
        render={(attrs) => (
          <div className={cx("search-results")} tabIndex="-1" {...attrs}>
            <Wrapper>
              {searchResults.map((result, index) => (
                <ProductItem key={index} data={result} />
              ))}
            </Wrapper>
          </div>
        )}
        onClickOutside={handelHideResults}
      >
        <div className={cx("search")}>
          <input
            ref={inputRef}
            type="text"
            value={searchText}
            spellCheck={false}
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
