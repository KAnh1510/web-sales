import PropTypes from "prop-types";
import classnames from "classnames/bind";

import styles from "./Button.module.scss";

const cx = classnames.bind(styles);

function Button({ children, className }) {
  return (
    <>
      <button className={cx("btn-addtocard", className)}>{children}</button>
    </>
  );
}

Button.prototype = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default Button;
