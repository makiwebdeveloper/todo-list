import Column from "./components/Column";
import { DragDropContext } from "react-beautiful-dnd";
import { useTasks } from "./contexts/TasksContext";
import { StatusType } from "./types";

function App() {
  const { data, onDragEnd } = useTasks();

  return (
    <div className="w-screen h-screen p-5 md:p-10">
      <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-800 text-center mb-5 md:mb-10">
        Welcome to Simple Todo List
      </h1>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex flex-col md:flex-row gap-5 w-[450px] md:w-[700px] mx-auto min-h-[calc(100%-100px)]">
          {Object.entries(data).map(([name, items]) => (
            <Column key={name} columnName={name as StatusType} tasks={items} />
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}

export default App;
