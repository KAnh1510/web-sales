import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import classnames from "classnames/bind";
import styles from "./ProductItem.module.scss";
import Image from "~/components/Images";
const cx = classnames.bind(styles);

function ProductItem({ data }) {
  return (
    <Link to={`/`} className={cx("wrapper")}>
      <div className={cx("info")}>
        <p className={cx("name")}>{data.name}</p>
        <span className={cx("prices")}>{data.prices}</span>
      </div>
      <Image className={cx("image")} src={data.imgFront} alt={data.name} />
    </Link>
  );
}

ProductItem.propTypes = {
  data: PropTypes.object.isRequired,
};

export default ProductItem;
