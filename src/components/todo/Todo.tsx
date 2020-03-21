import React from "react";
import classnames from "classnames/bind";

import styles from "./Todo.module.scss";

const cx = classnames.bind(styles);

export default () => {
  return (
    <div className={cx("todo-card")}>
      <input type="checkbox" />
      <span className={cx("id")}>1</span>
      <span className={cx("todo")} data-reference="@1 @2">
        todo
      </span>
      <button type="button">X</button>
    </div>
  );
};
