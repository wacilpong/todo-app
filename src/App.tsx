import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Add, Todo } from "components";
// import { initTodo } from "reducers/todo";
import { IStore } from "types";

import "./App.scss";

function App() {
  const dispatch = useDispatch();
  const { currentList } = useSelector<IStore, IStore["todo"]>(
    ({ todo }) => todo
  );

  useEffect(() => {
    // dispatch(initTodo({ number: 1, size: 5 }));
  }, [dispatch]);

  return (
    <main>
      <Add />

      <section>
        {currentList.map(data => (
          <Todo key={data.id} data={data} />
        ))}
      </section>
    </main>
  );
}

export default App;
