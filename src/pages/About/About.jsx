import React from "react";
import styles from "./About.module.scss";
import classnames from "classnames/bind";
import Pages from "~/layout/components/Pages";

const cx = classnames.bind(styles);
function About() {
  return <Pages title="Giới Thiệu"></Pages>;
}

export default About;
