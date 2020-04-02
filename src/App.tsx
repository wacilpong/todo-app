import React from "react";
import { Add, TodoWrapper, Search, DataSync } from "components";
import useTodo from "hooks/useTodo";

import "./App.scss";

function App() {
  const {
    qsJson,
    todoList,
    currentPage,
    totalCount,
    rowSize,
    handlePage,
    getTodoHandler
  } = useTodo();

  return (
    <main>
      <DataSync />

      <Add getTodoHandler={getTodoHandler} />

      <Search />

      <TodoWrapper
        qsJson={qsJson}
        todoList={todoList}
        currentPage={currentPage}
        totalCount={totalCount}
        rowSize={rowSize}
        handlePage={handlePage}
        getTodoHandler={getTodoHandler}
      />
    </main>
  );
}

export default App;
