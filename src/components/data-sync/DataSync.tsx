import React, { useState, ChangeEvent } from "react";
import { postCommonRestore } from "services/commonService";

import classnames from "classnames/bind";
import styles from "./DataSync.module.scss";

const cx = classnames.bind(styles);

const BACKUP_API_URL = "http://localhost:55555/api/common/backup";

export default function DataSync() {
  const [showRestore, setShowRestore] = useState(false);

  const download = () => (window.location.href = BACKUP_API_URL);

  const upload = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    const file = (event.target.files ?? [])[0];

    if (file) {
      postCommonRestore(file).then(({ message }) => {
        alert(message);
      });
    }
  };

  return (
    <>
      <button type="button" className={cx("btn")} onClick={download}>
        백업하기
      </button>

      <section className={cx("restore")}>
        <button
          type="button"
          className={cx("btn")}
          onClick={() => setShowRestore(!showRestore)}
        >
          {showRestore ? "숨기기" : "복원하기"}
        </button>

        {showRestore && (
          <label htmlFor="restoreUploader" className={cx("upload")}>
            <div className={cx("box")}>
              <input id="restoreUploader" type="file" onChange={upload} />
            </div>
          </label>
        )}
      </section>
    </>
  );
}
