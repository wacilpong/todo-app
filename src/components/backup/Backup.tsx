import React from "react";

import classnames from "classnames/bind";
import styles from "./Backup.module.scss";

const cx = classnames.bind(styles);

const BACKUP_API_URL = "http://localhost:55555/api/common/backup";

export default function Backup() {
  return (
    <>
      <a href={BACKUP_API_URL} className={cx("btn")}>
        백업하기
      </a>
      <button type="button" className={cx("btn")}>
        복원하기
      </button>
    </>
  );
}
