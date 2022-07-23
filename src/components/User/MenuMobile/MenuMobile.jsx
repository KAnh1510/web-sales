import React from "react";
import styles from "./MenuMobile.module.scss";
import classnames from "classnames/bind";
import Images from "~/components/Images";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-regular-svg-icons";
import { LISTSIDEBAR } from "~/data";
import { Link } from "react-router-dom";
import StorageKeys from "~/constant/storage-keys";

const cx = classnames.bind(styles);
function MenuMobile({ setShowMenu }) {
  const currentUser = JSON.parse(localStorage.getItem(StorageKeys.user));

  const handelClose = () => {
    setShowMenu(false);
  };
  return (
    <div className={cx("wrapper", "grid")}>
      <div className={cx("container")}>
        <div className={cx("header", "row")}>
          <Images
            src="https://file.hstatic.net/200000436739/file/logo-01-01_09ce146264e44644ba139b66098f2e6c.png"
            alt="Logo"
            className={cx("logo", "col", "m-8", "c-9")}
          />
          <div className={cx("icon_close", "col", "m-4", "c-3")}>
            <FontAwesomeIcon icon={faTimesCircle} onClick={handelClose} />
          </div>
        </div>
        <div className={cx("content")}>
          <ul>
            {LISTSIDEBAR.map((item, index) => {
              return (
                <li key={index}>
                  {currentUser && item.to2 ? (
                    <Link
                      to={item.to2 + currentUser.user_id}
                      title={item.title}
                      onClick={handelClose}
                    >
                      {item.title}
                    </Link>
                  ) : (
                    <Link to={item.to} title={item.title} onClick={handelClose}>
                      {item.title}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default MenuMobile;
