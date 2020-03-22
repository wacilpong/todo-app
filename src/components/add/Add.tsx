import React, { ChangeEvent, useState, KeyboardEvent } from "react";
import { postTodo } from "services/todoService";
import classnames from "classnames/bind";

import styles from "./Add.module.scss";

const cx = classnames.bind(styles);

interface IProps {
  getTodoHandler: () => void;
}

export default ({ getTodoHandler }: IProps) => {
  const [contents, setContents] = useState<string>("");

  const setContentsHandler = (event: ChangeEvent<HTMLInputElement>) =>
    setContents(event.target.value);

  const enterHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    event.preventDefault();

    if (contents && event.keyCode === 13) createTodo();
  };

  const createTodo = () =>
    postTodo({ contents }).then(({ message }) => {
      setContents("");
      getTodoHandler();

      alert(message);
    });

  return (
    <section className={cx("add-tab")}>
      <input
        type="text"
        placeholder="Todo Item"
        onChange={setContentsHandler}
        onKeyUp={enterHandler}
      />
      <button type="button" onClick={createTodo}>
        Add Todo
      </button>
    </section>
  );
};
