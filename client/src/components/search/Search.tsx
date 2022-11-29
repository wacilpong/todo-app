import React, {
  useState,
  useCallback,
  useEffect,
  ChangeEvent,
  KeyboardEvent,
} from "react";
import { useNavigate, useLocation } from "react-router-dom";
import qs from "qs";

import classnames from "classnames/bind";
import styles from "./Search.module.scss";

const cx = classnames.bind(styles);

type Indexable = { [key: string]: string };

enum SearchKey {
  keyword = "keyword",
  done = "done",
  deleted = "deleted",
  sort = "sort",
}

export default function Search() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchKey, setSearchKey] = useState<SearchKey>();
  const [searchParams, setSearchParams] = useState<Indexable>({});

  const setQueryJson = useCallback(
    () =>
      navigate(
        `${location.pathname}?${qs.stringify({
          ...searchParams,
        })}`
      ),
    [navigate, location, searchParams]
  );

  const setSearchParamsHandler = useCallback(
    (event: ChangeEvent<HTMLInputElement & HTMLSelectElement>) => {
      const key = event.target.name as SearchKey;
      const value = event.target.value;

      setSearchKey(key);

      if (value) {
        setSearchParams({
          ...searchParams,
          [key]: value,
        });
      } else {
        const nextState = { ...searchParams };

        delete nextState[key];
        setSearchParams(nextState);
      }
    },
    [searchParams]
  );

  const enterHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    event.preventDefault();

    if (event.keyCode === 13) setQueryJson();
  };

  useEffect(() => {
    if (searchKey && searchKey !== SearchKey.keyword) setQueryJson();
  }, [searchKey, setQueryJson]);

  return (
    <section className={cx("search-tab")}>
      <button
        type="button"
        className={cx("keyword-box")}
        onClick={setQueryJson}
      >
        <input
          name={SearchKey.keyword}
          type="search"
          className={cx("keyword")}
          placeholder="Search Todo..."
          onChange={setSearchParamsHandler}
          onKeyUp={enterHandler}
        />
        <i className={cx("fas fa-search", "search")} />
      </button>

      <div className={cx("filter-box")}>
        <i className={cx("fas fa-filter", "filter")} />

        <select name={SearchKey.done} onChange={setSearchParamsHandler}>
          <option value="">완료여부</option>
          <option value="1">완료</option>
          <option value="0">미완료</option>
        </select>

        <select name={SearchKey.deleted} onChange={setSearchParamsHandler}>
          <option value="">삭제여부</option>
          <option value="1">삭제</option>
          <option value="0">미삭제</option>
        </select>
      </div>

      <div className={cx("sort-box")}>
        <i className={cx("fas fa-sort-amount-down-alt", "sort")} />

        <select name={SearchKey.sort} onChange={setSearchParamsHandler}>
          <option value="">정렬</option>
          <option value="newest">최신순</option>
          <option value="oldest">오래된순</option>
        </select>
      </div>
    </section>
  );
}
