import styles from "./User.module.scss";
import classnames from "classnames/bind";

import Search from "./Search";
import { useState } from "react";
import Cart from "./Cart";
import { CartIcon, SearchIcon } from "../Icons";

const cx = classnames.bind(styles);

function User() {
  const [showSearch, setShowSearch] = useState(false);
  const [showCart, setShowCart] = useState(false);

  const handelShowSearch = () => {
    setShowSearch(true);
  };

  const handelShowCart = () => {
    setShowCart(true);
  };

  return (
    <>
      <div className={showSearch ? cx("showing") : cx("search-wrapper")}>
        <Search setShowSearch={setShowSearch} />
      </div>
      <div className={showCart ? cx("showing") : cx("search-wrapper")}>
        <Cart setShowCart={setShowCart} />
      </div>
      <span className={cx("choose-item")}>
        <div onClick={handelShowSearch}>
          <SearchIcon />
        </div>
      </span>

      <span className={cx("choose-item")}>
        <div className={cx("cart")} onClick={handelShowCart}>
          <CartIcon width="2.6rem" height="2.6rem" />
        </div>
      </span>
    </>
  );
}

export default User;
