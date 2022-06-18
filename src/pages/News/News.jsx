import { faFileText } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import classnames from "classnames/bind";

import DefaultLayout from "~/layout/DefaultLayout";
import HeaderPage from "~/layout/components/HeaderPage";
import styles from "./News.module.scss";
import Images from "~/components/Images";

const cx = classnames.bind(styles);

function News() {
  return (
    <DefaultLayout>
      <HeaderPage title="Behind the scenes/ LOOKBOOK tháng 11" />
      <div className={cx("wrapper", "grid")}>
        <div className={cx("row")}>
          <div className={cx("col l-3")} />
          <div className={cx("col l-9")}>
            <Images
              src="https://file.hstatic.net/200000436739/article/untitled-1-01_928d5005c073474c8037d7181050e768_1024x1024.jpg"
              alt="blogs"
            />
            <h1>Behind the scenes/ LOOKBOOK tháng 11</h1>
            <ul>
              <li>
                Người viết: DESIGN lúc &nbsp;
                <time
                  dateTime="2021-12-05"
                  className={cx("create-date")}
                  pubdate="2021-12-05"
                >
                  05.12.2021
                </time>
              </li>
              <li>
                <FontAwesomeIcon icon={faFileText} />
                <Link to="">Tin tức</Link>
              </li>
            </ul>
            <div className={cx("article-pages")}>
              <p>
                <Images
                  src="https://file.hstatic.net/200000436739/file/lookbook_1_magazine-06_2138e241dcde419e88f8b3dfe66f5b8c_2048x2048.jpg"
                  alt="lookbook1"
                />
              </p>
              <p>
                <Images
                  src="https://file.hstatic.net/200000436739/file/lookbook_1_magazine-05_ec8d5dcdb1e74235992fd0950ff6d692_2048x2048.jpg"
                  alt="lookbook2"
                />
              </p>
              <p>
                <Images
                  src="https://file.hstatic.net/200000436739/file/lookbook_1_magazine-04_198149b186b743348926ae5cf6bd0454_2048x2048.jpg"
                  alt="lookbook3"
                />
              </p>
              <p>
                <Images
                  src="https://file.hstatic.net/200000436739/file/lookbook_1_magazine-03_176801f622ac4df2b50d40c03e9ab25f_2048x2048.jpg"
                  alt="lookbook4"
                />
              </p>
              <p>
                <Images
                  src="https://file.hstatic.net/200000436739/file/lookbook_1_magazine-07_572434aeaa5b4a748458455d9e2b3e6e_2048x2048.jpg"
                  alt="lookbook5"
                />
              </p>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}

export default News;
