import styles from "./User.module.scss";
import classnames from "classnames/bind";

import Search from "./Search";
import { useState } from "react";
import Cart from "./Cart";
import { CartIcon, SearchIcon } from "../Icons";
import MenuMobile from "./MenuMobile";

const cx = classnames.bind(styles);

function User() {
  const [showSearch, setShowSearch] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const handelShowSearch = () => {
    setShowSearch(true);
  };

  const handelShowCart = () => {
    setShowCart(true);
  };

  const handelShowMenu = () => {
    setShowMenu(true);
  };

  return (
    <>
      <div className={showSearch ? cx("showing") : cx("search-wrapper")}>
        <Search setShowSearch={setShowSearch} />
      </div>
      <div className={showCart ? cx("showing") : cx("search-wrapper")}>
        <Cart setShowCart={setShowCart} />
      </div>

      <div className={showMenu ? cx("showing") : cx("search-wrapper")}>
        <MenuMobile setShowMenu={setShowMenu} />
      </div>

      <div className={cx("choose", "row")}>
        <div
          className={cx("choose-item", "col l-2 m-2 c-0")}
          onClick={handelShowSearch}
        >
          <SearchIcon />
        </div>

        <div
          className={cx("choose-item", "cart", "col m-2 l-2")}
          onClick={handelShowCart}
        >
          <CartIcon width="2.6rem" height="2.6rem" />
        </div>

        <span className="col l-0">
          <div className={cx("menu")} onClick={handelShowMenu}>
            <ion-icon
              name="menu-outline"
              style={{ width: "2.6rem", height: "2.6rem", cursor: "pointer" }}
            ></ion-icon>
          </div>
        </span>
      </div>
    </>
  );
}

export default User;
