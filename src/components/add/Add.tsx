import React, { ChangeEvent, useState, KeyboardEvent } from "react";
import { postTodo } from "services/todoService";

import classnames from "classnames/bind";
import styles from "./Add.module.scss";

const cx = classnames.bind(styles);

interface IProps {
  getTodoHandler: () => void;
}

export default function Add({ getTodoHandler }: IProps) {
  const [contents, setContents] = useState("");

  const setContentsHandler = (event: ChangeEvent<HTMLInputElement>) =>
    setContents(event.target.value);

  const enterHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    event.preventDefault();

    if (event.keyCode === 13) createTodo();
  };

  const createTodo = () =>
    contents &&
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
        value={contents}
      />
      <button type="button" onClick={createTodo}>
        Add Todo
      </button>
    </section>
  );
}
