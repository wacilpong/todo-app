import React, {
  useMemo,
  useCallback,
  ChangeEvent,
  FocusEvent,
  MouseEvent
} from "react";
import { getThisTodo, patchTodo } from "services/todoService";
import classnames from "classnames/bind";
import { ITodo } from "types";

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

      // TODO: event.target.value가 현재 content랑 다를 때만 DB 업데이트
      console.log(id);
      console.log(contents);
      console.log(event.target.value);
    },
    [id, contents]
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
