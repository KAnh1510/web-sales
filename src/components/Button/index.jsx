import React from "react";
import classnames from "classnames/bind";

import styles from "./Button.module.scss";

const cx = classnames.bind(styles);

function Button({ children }) {
  return (
    <>
      <button className={cx("btn-addtocard")}>{children}</button>
    </>
  );
}

export default Button;
