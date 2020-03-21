import React from "react";
import classnames from "classnames/bind";

import styles from "./Add.module.scss";

const cx = classnames.bind(styles);

export default () => {
  return (
    <section className={cx("add-tab")}>
      <input type="text" placeholder="Todo Item" />
      <button>Add Todo</button>
    </section>
  );
};
