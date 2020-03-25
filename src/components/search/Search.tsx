import React from "react";

import classnames from "classnames/bind";
import styles from "./Search.module.scss";

const cx = classnames.bind(styles);

export default function Search() {
  return (
    <section className={cx("search-tab")}>
      <div className={cx("keyword-box")}>
        <input
          type="search"
          className={cx("keyword")}
          placeholder="Search Todo..."
        />
        <button type="button">
          <i className={cx("fas fa-search", "search")}></i>
        </button>
      </div>

      <div className={cx("filter-box")}>
        <i className={cx("fas fa-filter", "filter")} />

        <select name="isDone">
          <option value="">완료여부</option>
          <option value="1">완료</option>
          <option value="0">미완료</option>
        </select>

        <select name="isDeleted">
          <option value="">삭제여부</option>
          <option value="1">삭제</option>
          <option value="0">미삭제</option>
        </select>
      </div>

      <div className={cx("sort-box")}>
        <i className={cx("fas fa-sort-amount-down-alt", "sort")} />

        <select name="isDone">
          <option value="">정렬</option>
          <option value="newest">최신순</option>
          <option value="oldest">오래된순</option>
        </select>
      </div>
    </section>
  );
}
