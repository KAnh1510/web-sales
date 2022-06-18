import React, { useRef, useState } from "react";
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
import searchProductReducer from "./SearchProductSlice";
import { searchProductsSelector } from "~/redux/selector";

const cx = classnames.bind(styles);

function Search({ setShowSearch }) {
  const [showResults, setShowResults] = useState(true);
  const [searchText, setSearchText] = useState("");

  const inputRef = useRef();
  const dispatch = useDispatch();

  const searchResults = useSelector(searchProductsSelector);

  const handelSearchTextChange = (e) => {
    setSearchText(e.target.value.toUpperCase());
    dispatch(
      searchProductReducer.actions.searchProductChange(
        e.target.value.toUpperCase()
      )
    );
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
              {searchResults.map((result) => (
                <ProductItem key={result.id} data={result} />
              ))}
            </Wrapper>
          </div>
        )}
      >
        <div className={cx("search")}>
          <input
            ref={inputRef}
            type="text"
            value={searchText}
            onChange={handelSearchTextChange}
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
