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
import { ITodo } from "types";

import classnames from "classnames/bind";
import styles from "./Todo.module.scss";

const cx = classnames.bind(styles);

interface IProps {
  data: ITodo;
  getTodoHandler: () => void;
}

export default ({
  data: { id, createdAt, updatedAt, contents, referenceTodoId, isDone },
  getTodoHandler
}: IProps) => {
  const boolIsDone = useMemo(() => Boolean(isDone), [isDone]);
  const referenceTodoIdText = useMemo(
    () => referenceTodoId.reduce((acc, id) => `${acc} @${id}`, ""),
    [referenceTodoId]
  );

  const checkValidateReferenceTodo = useCallback(() => {
    const requests = referenceTodoId.map(referenceId =>
      getThisTodo(referenceId)
    );

    return Promise.all(requests).then(responses => {
      return responses
        .filter(({ data: { isDone } }) => !Boolean(isDone))
        .map(({ data: { id } }) => id);
    });
  }, [referenceTodoId]);

  const updateCompleteTodo = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      event.persist();

      const invalidateTodo = await checkValidateReferenceTodo();

      if (invalidateTodo.length) {
        alert(`참조되어 있는 (${invalidateTodo})번 todo를 먼저 완료해주세요.`);
        return;
      }

      patchTodo(id, { isDone: !boolIsDone ? 1 : 0 });
      getTodoHandler();
    },
    [id, boolIsDone, checkValidateReferenceTodo, getTodoHandler]
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

    const targetId = event.currentTarget.id;
    const referenceId = event.dataTransfer.getData("text");

    if (targetId === referenceId) return;

    postTodoReference(Number(targetId), {
      referenceTodoId: Number(referenceId)
    }).then(({ message }) => {
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
          checked={Boolean(isDone)}
          onChange={updateCompleteTodo}
        />
        <span className={cx("id")}>{id}</span>
        <div className={cx("todo")} data-reference={referenceTodoIdText}>
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
        <button type="button" onClick={deleteThisTodo}>
          X
        </button>
      </div>

      <div className={cx("description")}>
        작성일: {createdAt} {updatedAt && `| 최종 수정일: ${updatedAt}`}
      </div>
    </div>
  );
};
