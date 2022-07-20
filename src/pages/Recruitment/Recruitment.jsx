import styles from "./Recruitment.module.scss";
import classnames from "classnames/bind";
import Images from "~/components/Images";
import DefaultLayout from "~/layout/DefaultLayout";

const cx = classnames.bind(styles);

function Recruitment() {
  return (
    <DefaultLayout>
      <div className={cx("wrapper", "grid")} style={{ marginTop: "20px" }}>
        <div className={cx("row")}>
          <div className={cx("col l-2")}></div>
          <div className={cx("container", "col l-8")}>
            <p>
              <span className={cx("title")}>
                <strong>Vị trí tuyển dụng tại hồ chí minh</strong>
              </span>
            </p>
            <p>
              <span className={cx("job")}>
                <strong>1.Digital Marketing</strong>
              </span>
            </p>
            <Images src="https://file.hstatic.net/200000436739/file/recruitment-06_fce4ca8cc5e64d1d894fc27337a5d1e6_grande.jpg" />

            <p>
              <span className={cx("job")}>
                <strong>2.WAREHOUSE STAFF</strong>
              </span>
            </p>
            <Images src="https://file.hstatic.net/200000436739/file/recruitment-07_8380fe8e8a4c4ae58fe554e1c55f6c6e_grande.jpg" />
          </div>
          <div className={cx("col l-2")}></div>
        </div>
      </div>
    </DefaultLayout>
  );
}

export default Recruitment;
