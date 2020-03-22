import React, { useEffect, useState } from "react";
import { Add, Todo } from "components";
import { getTodo } from "services/todoService";
import { ITodo } from "types";

import "./App.scss";

function App() {
  const [todoList, setTodoList] = useState<ITodo[]>([]);

  useEffect(() => {
    getTodo({ number: 1, size: 5 }).then(({ data }) => {
      setTodoList(data);
    });
  }, []);

  return (
    <main>
      <Add />

      <section>
        {todoList.map(data => (
          <Todo key={data.id} data={data} />
        ))}
      </section>
    </main>
  );
}

export default App;
