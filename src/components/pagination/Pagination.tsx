import React, { useMemo } from "react";

import classNames from "classnames/bind";
import style from "./Pagination.module.scss";

const cx = classNames.bind(style);

interface IProps {
  totalCount: number;
  page: number;
  size: number;
  handlePage: (_page: number) => void;
}

const PAGE_SET_SIZE = 5;

export default ({ totalCount, page, size, handlePage }: IProps) => {
  const pageTotal = useMemo(() => Math.ceil(totalCount / size), [totalCount, size]);
  const pageArray = useMemo(
    () =>
      Array(pageTotal)
        .fill(null)
        .map((v, i) => i + 1),
    [pageTotal]
  );

  const currentPageSet = useMemo(() => Math.ceil(page / PAGE_SET_SIZE), [page]);
  const totalPageSet = useMemo(() => Math.ceil(pageTotal / PAGE_SET_SIZE), [pageTotal]);
  const pageOffset = useMemo(() => currentPageSet * PAGE_SET_SIZE, [currentPageSet]);

  const start = useMemo(
    () => pageArray.indexOf((currentPageSet - 1) * PAGE_SET_SIZE) + 1,
    [pageArray, currentPageSet]
  );

  const end = useMemo(
    () =>
      pageTotal > pageOffset
        ? pageArray.indexOf(pageOffset) + 1
        : pageArray.indexOf(pageTotal) + 1,
    [pageArray, pageTotal, pageOffset]
  );

  const pageWindow = useMemo(() => pageArray.slice(start, end), [
    pageArray,
    start,
    end
  ]);

  return (
    <section className={cx("pagination")}>
      {page > PAGE_SET_SIZE && (
        <button
          type="button"
          className={cx("first")}
          data-arrow="<"
          onClick={() => handlePage(1)}
        />
      )}

      {pageWindow.map(n => (
        <button
          key={n}
          type="button"
          className={cx("page", page === n && "on")}
          onClick={() => handlePage(n)}
        >
          {n}
        </button>
      ))}

      {currentPageSet < totalPageSet && (
        <button
          type="button"
          className={cx("end")}
          data-arrow=">"
          onClick={() => handlePage(pageOffset + 1)}
        />
      )}
    </section>
  );
};
