import styles from "./User.module.scss";
import classnames from "classnames/bind";

import Search from "./Search";
import { useState } from "react";
import Card from "./Card";
import { CardIcon, SearchIcon } from "../Icons";

const cx = classnames.bind(styles);

function User() {
  const [showSearch, setShowSearch] = useState(false);
  const [showCard, setShowCard] = useState(false);

  const handelShowSearch = () => {
    setShowSearch(true);
  };

  const handelShowCard = () => {
    setShowCard(true);
  };

  return (
    <>
      <div className={showSearch ? cx("showing") : cx("search-wrapper")}>
        <Search setShowSearch={setShowSearch} />
      </div>
      <div className={showCard ? cx("showing") : cx("search-wrapper")}>
        <Card setShowCard={setShowCard} />
      </div>
      <span className={cx("choose-item")}>
        <div onClick={handelShowSearch}>
          <SearchIcon />
        </div>
      </span>

      <span className={cx("choose-item")}>
        <div className={cx("cart")} onClick={handelShowCard}>
          <CardIcon width="2.6rem" height="2.6rem" />
        </div>
      </span>
    </>
  );
}

export default User;
