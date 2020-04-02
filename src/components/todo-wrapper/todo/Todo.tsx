import React, {
  useMemo,
  useCallback,
  ChangeEvent,
  FocusEvent,
  MouseEvent,
  DragEvent
} from "react";
import { getThisTodo, patchTodo, deleteTodo } from "services/todoService";
import { postTodoReference } from "services/todoReferenceService";
import formatDateTime from "utils/formatDateTime";
import { ITodo } from "types";

import classnames from "classnames/bind";
import styles from "./Todo.module.scss";

const cx = classnames.bind(styles);

interface IProps {
  data: ITodo;
  getTodoHandler: () => void;
}

export default function Todo({
  data: {
    id,
    createdAt,
    updatedAt,
    contents,
    todoReferences,
    isDone,
    isDeleted
  },
  getTodoHandler
}: IProps) {
  const todoReferenceIdText = useMemo(
    () =>
      todoReferences.reduce((acc, cur) => `${acc} @${cur.todoReferenceId}`, ""),
    [todoReferences]
  );

  const getDateText = (type: string) => `${formatDateTime(type)} ${formatDateTime(type, "timeStr")}`

  const checkValidateTodoReference = useCallback(() => {
    const requests = todoReferences.map(({ todoReferenceId }) =>
      getThisTodo(todoReferenceId)
    );

    return Promise.all(requests).then(responses => {
      return responses
        .filter(({ data: { isDone } }) => !isDone)
        .map(({ data: { id } }) => id);
    });
  }, [todoReferences]);

  const updateDoneTodo = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      event.persist();

      const invalidateTodo = await checkValidateTodoReference();

      if (!isDone && invalidateTodo.length) {
        alert(`참조되어 있는 (${invalidateTodo})번 todo를 먼저 완료해주세요.`);
        return;
      }

      patchTodo(id, { isDone: !isDone ? 1 : 0 });
      getTodoHandler();
    },
    [id, isDone, checkValidateTodoReference, getTodoHandler]
  );

  const updateContentsTodo = useCallback(
    (event: FocusEvent<HTMLInputElement>) => {
      event.preventDefault();

      if (event.target.value === contents) return;

      patchTodo(id, { contents: event.target.value });
      getTodoHandler();
    },
    [id, contents, getTodoHandler]
  );

  const deleteThisTodo = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();

      deleteTodo(id).then(({ message }) => {
        alert(message);
        getTodoHandler();
      });
    },
    [id, getTodoHandler]
  );

  const handleDragStart = (event: DragEvent<HTMLDivElement>) => {
    event.dataTransfer.setData("text/plain", event.currentTarget.id);
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "copy";
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    const targetId = Number(event.currentTarget.id);
    const todoReferenceId = Number(event.dataTransfer.getData("text"));

    if (targetId === todoReferenceId) return;

    postTodoReference(targetId, { todoReferenceId }).then(({ message }) => {
      alert(message);
      getTodoHandler();
    });
  };

  return (
    <div
      id={String(id)}
      className={cx("todo-card")}
      draggable="true"
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div className={cx("card")}>
        <input
          type="checkbox"
          className={cx("completed")}
          checked={isDone}
          onChange={updateDoneTodo}
        />
        <span className={cx("id")}>{id}</span>
        <div className={cx("todo")} data-reference={todoReferenceIdText}>
          {isDone ? (
            <s>{contents}</s>
          ) : (
            <input
              type="text"
              defaultValue={contents}
              onBlur={updateContentsTodo}
            />
          )}
        </div>

        {!isDeleted && (
          <button type="button" onClick={deleteThisTodo}>
            X
          </button>
        )}
      </div>

      <div className={cx("description")}>
        작성일: {getDateText(createdAt)}&nbsp;
        {createdAt !== updatedAt && `| 최종 수정일: ${getDateText(updatedAt)}`}
      </div>
    </div>
  );
}
