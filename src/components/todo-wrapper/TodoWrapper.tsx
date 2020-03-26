import React, { useEffect } from "react";
import useTodo from "hooks/useTodo";
import { Todo, Pagination } from "components";

import classnames from "classnames/bind";
import styles from "./TodoWrapper.module.scss";

const cx = classnames.bind(styles);

export default function TodoWrapper() {
  const {
    todoList,
    currentPage,
    totalCount,
    rowSize,
    handlePage,
    getTodoHandler
  } = useTodo();

  useEffect(getTodoHandler, [currentPage]);

  return (
    <section className={cx("todo-tab")}>
      {todoList.length > 1 && (
        <div className={cx("tip")}>
          Tip!&nbsp;&nbsp;to-do를 드래그해서 다른 to-do로 참조할 수 있어요.
        </div>
      )}

      {todoList.map(data => (
        <Todo key={data.id} data={data} getTodoHandler={getTodoHandler} />
      ))}

      {todoList.length > 0 && (
        <Pagination
          totalCount={totalCount}
          page={currentPage}
          size={rowSize}
          handlePage={handlePage}
        />
      )}
    </section>
  );
}
