import React, { useEffect } from "react";
import { Todo, Pagination } from "components";

import classnames from "classnames/bind";
import styles from "./TodoWrapper.module.scss";
import { ITodo, ITodoQueryJson } from "types";

const cx = classnames.bind(styles);

interface IProps {
  qsJson: ITodoQueryJson;
  todoList: ITodo[];
  currentPage: number;
  totalCount: number;
  rowSize: number;
  handlePage: (_page: number) => void;
  getTodoHandler: () => void;
}

export default function TodoWrapper({
  qsJson,
  todoList,
  currentPage,
  totalCount,
  rowSize,
  handlePage,
  getTodoHandler
}: IProps) {
  useEffect(getTodoHandler, [qsJson]);

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
