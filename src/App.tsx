import React from "react";
import { Add, TodoWrapper, Search } from "components";

import "./App.scss";

function App() {
  return (
    <main>
      <Add />
      <Search />
      <TodoWrapper />
    </main>
  );
}

export default App;
