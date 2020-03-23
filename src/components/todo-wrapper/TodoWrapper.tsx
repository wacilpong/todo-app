import React from "react";
import { Todo } from "components";
import { ITodo } from "types";

import classnames from "classnames/bind";
import styles from "./TodoWrapper.module.scss";

const cx = classnames.bind(styles);

interface IProps {
  todoList: ITodo[];
  getTodoHandler: () => void;
}

export default ({ todoList, getTodoHandler }: IProps) => (
  <section className={cx("todo-tab")}>
    {todoList.length > 1 && (
      <div className={cx("tip")}>
        Tip!&nbsp;&nbsp;to-do를 드래그해서 다른 to-do로 참조할 수 있어요.
      </div>
    )}

    {todoList.map(data => (
      <Todo key={data.id} data={data} getTodoHandler={getTodoHandler} />
    ))}
  </section>
);
