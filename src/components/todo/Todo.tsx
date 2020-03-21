import React, {
  useMemo,
  useCallback,
  ChangeEvent,
  FocusEvent,
  MouseEvent
} from "react";
import classnames from "classnames/bind";
import { ITodo } from "types";

import styles from "./Todo.module.scss";

const cx = classnames.bind(styles);

export default ({
  data: { id, createdAt, updatedAt, content, referenceTodoId, isDone }
}: {
  data: ITodo;
}) => {
  const referenceTodoIdText = useMemo(
    () => referenceTodoId.reduce((acc, id) => `${acc} @${id}`, ""),
    [referenceTodoId]
  );

  const updateCompleteTodo = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      event.persist();

      // TODO: id로 DB에서 isDone 업데이트 -> change이벤트 될 때마다 !isDone 값으로 업데이트
      // TODO: !isDone === true인 경우, referenceTodoId가 있을 때는 업데이트 불가하도록 안내
      console.log(id);
      console.log(event);
    },
    [id]
  );

  const updateContentTodo = useCallback(
    (event: FocusEvent<HTMLInputElement>) => {
      event.preventDefault();

      // TODO: event.target.value가 현재 content랑 다를 때만 DB 업데이트
      console.log(id);
      console.log(content);
      console.log(event.target.value);
    },
    [id, content]
  );

  const deleteTodo = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();

      // TODO: id로 DB에서 삭제
      console.log(id);
    },
    [id]
  );

  return (
    <div className={cx("todo-card")}>
      <div className={cx("card")}>
        <input
          type="checkbox"
          className={cx("completed")}
          checked={isDone}
          onChange={updateCompleteTodo}
        />
        <span className={cx("id")}>{id}</span>
        <div className={cx("todo")} data-reference={referenceTodoIdText}>
          <input
            type="text"
            defaultValue={content}
            onBlur={updateContentTodo}
          />
        </div>
        <button type="button" onClick={deleteTodo}>
          X
        </button>
      </div>

      <div className={cx("description")}>
        작성일: {createdAt} {updatedAt && `| 최종 수정일: ${updatedAt}`}
      </div>
    </div>
  );
};
