import styles from "./Capcha.module.scss";
import classnames from "classnames/bind";

const cx = classnames.bind(styles);

function Capcha() {
  return (
    <div className={cx("capcha")}>
      This site is protected by reCAPTCHA and the Google&nbsp;
      <a
        href="https://policies.google.com/privacy"
        target="_blank"
        rel="noreferrer"
      >
        Privacy Policy
      </a>
      &nbsp;and&nbsp;
      <a
        href="https://policies.google.com/terms"
        target="_blank"
        rel="noreferrer"
      >
        Terms of Service
      </a>
      &nbsp;apply.
    </div>
  );
}

export default Capcha;
