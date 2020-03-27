import React, {
  useState,
  useCallback,
  useEffect,
  ChangeEvent,
  KeyboardEvent
} from "react";
import { useHistory } from "react-router-dom";
import qs from "qs";

import classnames from "classnames/bind";
import styles from "./Search.module.scss";

const cx = classnames.bind(styles);

type Indexer = { [key: string]: any };

export default function Search() {
  const history = useHistory();
  const [searchParams, setSearchParams] = useState<Indexer>({});

  const setSearchParamsHandler = useCallback(
    (event: ChangeEvent<HTMLInputElement & HTMLSelectElement>) => {
      const key = event.target.name;
      const value = event.target.value;

      if (value) {
        setSearchParams({
          ...searchParams,
          [key]: value
        });
      } else {
        setSearchParams(prevState => {
          const nextState = { ...prevState };
          delete nextState[key];
          return nextState;
        });
      }
    },
    [searchParams]
  );

  const setQueryString = useCallback(() => {
    history.push(
      `${history.location.pathname}?${qs.stringify({
        ...searchParams
      })}`
    );
  }, [history, searchParams]);

  const enterHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    event.preventDefault();

    if (event.keyCode === 13) setQueryString();
  };

  return (
    <section className={cx("search-tab")}>
      <div className={cx("keyword-box")}>
        <input
          type="search"
          name="query"
          className={cx("keyword")}
          placeholder="Search Todo..."
          onChange={setSearchParamsHandler}
          onKeyUp={enterHandler}
        />
        <i className={cx("fas fa-search", "search")} />
      </div>

      <div className={cx("filter-box")}>
        <i className={cx("fas fa-filter", "filter")} />

        <select name="done" onChange={setSearchParamsHandler}>
          <option value="">완료여부</option>
          <option value="1">완료</option>
          <option value="0">미완료</option>
        </select>

        <select name="deleted" onChange={setSearchParamsHandler}>
          <option value="">삭제여부</option>
          <option value="1">삭제</option>
          <option value="0">미삭제</option>
        </select>
      </div>

      <div className={cx("sort-box")}>
        <i className={cx("fas fa-sort-amount-down-alt", "sort")} />

        <select name="sort" onChange={setSearchParamsHandler}>
          <option value="">정렬</option>
          <option value="newest">최신순</option>
          <option value="oldest">오래된순</option>
        </select>
      </div>
    </section>
  );
}
