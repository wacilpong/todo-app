import { useState, useCallback, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getTodo } from "services/todoService";
import { ITodo, ITodoQueryJson } from "types";
import qs from "qs";

const rowSize = 5;

export default function useTodo() {
  const navigate = useNavigate();
  const location = useLocation();
  const [todoList, setTodoList] = useState<ITodo[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);

  const qsJson: ITodoQueryJson = useMemo(
    () => qs.parse(location.search, { ignoreQueryPrefix: true }),
    [location]
  );

  const currentPage = useMemo(() => Number(qsJson.page || 1), [qsJson]);

  const handlePage = useCallback(
    (page: number) => {
      navigate(`${location.pathname}?${qs.stringify({ ...qsJson, page })}`);
    },
    [navigate, location, qsJson]
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
    getTodoHandler,
  };
}
