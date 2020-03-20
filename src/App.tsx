import React, { useEffect } from "react";
import { getTest } from "./services/testService";

import "./App.css";

function App() {
  useEffect(() => {
    (async () => {
      const test = await getTest();
      console.log(test);
    })();
  }, []);

  return <div className="App"></div>;
}

export default App;
