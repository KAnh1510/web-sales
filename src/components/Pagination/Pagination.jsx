import React from "react";
import PropTypes from "prop-types";
import styles from "./Pagination.module.scss";
import classnames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeftLong,
  faArrowRightLong,
} from "@fortawesome/free-solid-svg-icons";

const cx = classnames.bind(styles);

function Pagination(props) {
  const { pagination, onPageChange } = props;
  const { _page, _limit, _totalRows } = pagination;
  const totalPages = Math.ceil(_totalRows / _limit);

  const handlePageChange = (newPage) => {
    if (onPageChange) {
      onPageChange(newPage);
    }
  };
  return (
    <div className={cx("pagination")}>
      <button
        onClick={() => handlePageChange(_page - 1)}
        className={_page <= 1 ? cx("disabled") : ""}
      >
        <FontAwesomeIcon icon={faArrowLeftLong} />
      </button>
      <button
        disable={_page >= totalPages ? "true" : "false"}
        onClick={() => handlePageChange(_page + 1)}
        className={_page >= totalPages ? cx("disabled") : ""}
      >
        <FontAwesomeIcon icon={faArrowRightLong} />
      </button>
    </div>
  );
}

Pagination.propTypes = {
  pagination: PropTypes.object.isRequired,
  onPageChange: PropTypes.func,
};

Pagination.defaultProps = {
  onPageChange: null,
};

export default Pagination;
