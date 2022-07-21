import React from "react";
import styles from "./HeaderMobile.module.scss";
import classnames from "classnames/bind";

import Images from "~/components/Images";
import User from "~/components/User";
import { Link } from "react-router-dom";

const cx = classnames.bind(styles);
function HeaderMobile() {
  return (
    <div className={cx("grid", "wrapper")}>
      <div className={cx("row", "container")}>
        <div className="col l-0 m-6">
          <Link to="/">
            <Images
              src="https://file.hstatic.net/200000436739/file/logo-01-01_09ce146264e44644ba139b66098f2e6c.png"
              alt="Logo"
              className={cx("logo")}
            />
          </Link>
        </div>
        <div className="col l-0 m-6">
          <User />
        </div>
      </div>
    </div>
  );
}

export default HeaderMobile;
