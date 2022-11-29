import React from "react";

import classnames from "classnames/bind";
import styles from "./Loader.module.scss";

const cx = classnames.bind(styles);

interface IProps {
  inline?: boolean;
}

// TODO: 추후 inline 형태의 로더 필요할 수 있음
export default function Loader({ inline }: IProps) {
  return (
    <div className={cx("wrapper", { inline })}>
      <div className={cx("loader")} />
    </div>
  );
}
