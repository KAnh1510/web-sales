import PropTypes from "prop-types";
import Footer from "../components/Footer";
import SideBar from "../components/SideBar";
import styles from "./DefaultLayout.module.scss";
import classnames from "classnames/bind";

const cx = classnames.bind(styles);

function DefaultLayout({ children, cover }) {
  return (
    <div className="grid">
      <div className="row">
        <div className="col l-2">
          <SideBar />
        </div>
        <div className="col l-10">
          <div className={cx("content")}>{children}</div>
        </div>
      </div>
      {cover}
      <Footer />
    </div>
  );
}

DefaultLayout.propTypes = {
  children: PropTypes.node,
  cover: PropTypes.object,
};

export default DefaultLayout;
