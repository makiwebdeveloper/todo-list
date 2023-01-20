import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { TasksProvider } from "./contexts/TasksContext";

ReactDOM.render(
  <React.StrictMode>
    <TasksProvider>
      <App />
    </TasksProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
