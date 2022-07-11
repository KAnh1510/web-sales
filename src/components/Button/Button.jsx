import PropTypes from "prop-types";
import classnames from "classnames/bind";

import styles from "./Button.module.scss";

const cx = classnames.bind(styles);

function Button({ children, className, onClick }) {
  return (
    <>
      <button className={cx("btn-addtocard", className)} onClick={onClick}>
        {children}
      </button>
    </>
  );
}

Button.prototype = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func,
};

export default Button;
