import { useState } from "react";
import { ITask } from "./types";
import { v4 } from "uuid";
import Column from "./components/Column";

function App() {
  const [data, setData] = useState<{
    todo: ITask[];
    "in progress": ITask[];
    done: ITask[];
  }>({
    todo: [
      { id: v4(), title: "Ecommerce", color: "bg-red-400" },
      { id: v4(), title: "Pinterest Clone", color: "bg-blue-400" },
    ],
    "in progress": [{ id: v4(), title: "Todo List", color: "bg-purple-400" }],
    done: [],
  });

  return (
    <div className="w-screen h-screen p-10">
      <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-800 text-center mb-10">
        Welcome to Simple Todo List
      </h1>
      <div className="flex gap-5 w-[700px] mx-auto min-h-[calc(100%-60px)]">
        {Object.entries(data).map(([name, items]) => (
          <Column key={name} columnName={name} tasks={items} />
        ))}
      </div>
    </div>
  );
}

export default App;
