import { useState } from "react";
import Column from "./components/Column";
import { data } from "./data";

function App() {
  const [columns, setColumns] = useState(data);

  return (
    <div className="w-screen h-screen bg-neutral-900 text-white p-10">
      <h1 className="text-center font-semibold text-3xl">Todo List</h1>
      <div className="flex gap-10 min-h-[calc(100%-20px)]">
        {Object.entries(columns).map(([id, column]) => (
          <Column key={id} column={column} />
        ))}
      </div>
    </div>
  );
}

export default App;
