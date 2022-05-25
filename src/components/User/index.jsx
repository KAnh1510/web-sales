import styles from "./User.module.scss";
import classnames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faCircleUser,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";

const cx = classnames.bind(styles);

function User() {
  return (
    <>
      <span className={cx("choose-item")}>
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </span>
      <span className={cx("choose-item")}>
        <FontAwesomeIcon icon={faCircleUser} />
      </span>
      <span className={cx("choose-item")}>
        <FontAwesomeIcon icon={faCartShopping} />
      </span>
    </>
  );
}

export default User;
