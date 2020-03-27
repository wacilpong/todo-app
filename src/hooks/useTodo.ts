import { useState, useCallback, useMemo } from "react";
import { useHistory } from "react-router-dom";
import { getTodo } from "services/todoService";
import { ITodo, ITodoQueryJson } from "types";
import qs from "qs";

const rowSize = 5;

export default function useTodo() {
  const history = useHistory();
  const [todoList, setTodoList] = useState<ITodo[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);

  const qsJson: ITodoQueryJson = useMemo(
    () => qs.parse(history.location.search, { ignoreQueryPrefix: true }),
    [history.location.search]
  );

  const currentPage = useMemo(() => Number(qsJson.page || 1), [qsJson]);

  const handlePage = useCallback(
    (page: number) => {
      history.push(
        `${history.location.pathname}?${qs.stringify({ ...qsJson, page })}`
      );
    },
    [history, qsJson]
  );

  const getTodoHandler = useCallback(() => {
    const params = { ...qsJson, page: currentPage, size: rowSize };

    getTodo(params).then(({ data, meta }) => {
      setTotalCount(meta.totalCount);
      setTodoList(data);
    });
  }, [currentPage, qsJson]);

  return {
    qsJson,
    rowSize,
    todoList,
    totalCount,
    currentPage,
    handlePage,
    getTodoHandler
  };
}
