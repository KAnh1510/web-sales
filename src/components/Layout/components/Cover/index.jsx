import styles from "./Cover.module.scss";
import classnames from "classnames/bind";

const cx = classnames.bind(styles);
function Cover() {
  return <div className={cx("cover")}></div>;
}

export default Cover;
