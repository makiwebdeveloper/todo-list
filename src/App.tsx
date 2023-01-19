import { useState } from "react";
import { IData, ITask, StatusType } from "./types";
import { v4 } from "uuid";
import Column from "./components/Column";
import { DragDropContext, DropResult } from "react-beautiful-dnd";

const onDragEnd = (
  result: DropResult,
  data: IData,
  setData: React.Dispatch<React.SetStateAction<IData>>
) => {
  const { destination, source } = result;

  if (!destination) return;

  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = data[source.droppableId as StatusType];
    const destColumn = data[destination.droppableId as StatusType];
    const sourceItems = [...sourceColumn];
    const destItems = [...destColumn];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    setData({
      ...data,
      [source.droppableId]: sourceItems,
      [destination.droppableId]: destItems,
    });
  } else {
    const column = data[source.droppableId as StatusType];
    const copiedItems = [...column];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setData({
      ...data,
      [source.droppableId]: copiedItems,
    });
  }
};

function App() {
  const [data, setData] = useState<IData>({
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
      <DragDropContext onDragEnd={(result) => onDragEnd(result, data, setData)}>
        <div className="flex gap-5 w-[700px] mx-auto min-h-[calc(100%-60px)]">
          {Object.entries(data).map(([name, items]) => (
            <Column key={name} columnName={name} tasks={items} />
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}

export default App;
