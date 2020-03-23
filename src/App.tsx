import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { Add, Pagination, TodoWrapper } from "components";
import { getTodo } from "services/todoService";
import { ITodo } from "types";
import qs from "qs";

import "./App.scss";

const ROW_SIZE = 5;

function App() {
  const history = useHistory();
  const [todoList, setTodoList] = useState<ITodo[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);

  const qsJson = useMemo(
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

  const getTodoHandler = () => {
    getTodo({ page: currentPage, size: ROW_SIZE }).then(({ data, meta }) => {
      setTotalCount(meta.totalCount);
      setTodoList(data);
    });
  };

  useEffect(getTodoHandler, [currentPage]);

  return (
      <main>
        <Add getTodoHandler={getTodoHandler} />

        <TodoWrapper todoList={todoList} getTodoHandler={getTodoHandler} />

        {todoList.length > 0 && (
          <Pagination
            totalCount={totalCount}
            page={currentPage}
            size={ROW_SIZE}
            handlePage={handlePage}
          />
        )}
      </main>
  );
}

export default App;
