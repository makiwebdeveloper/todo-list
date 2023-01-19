import { createContext, FC, useContext, useState } from "react";
import { IData, ITask, StatusType } from "../types";
import { v4 } from "uuid";
import { DropResult } from "react-beautiful-dnd";

interface ITasksContext {
  data: IData;
  onDragEnd: (result: DropResult) => void;
  editTitle: (newTitle: string, taskId: string) => void;
}

const TasksContext = createContext<ITasksContext | null>(null);
export const useTasks = () => useContext(TasksContext) as ITasksContext;

export const TasksProvider: FC = ({ children }) => {
  const [data, setData] = useState<IData>({
    todo: [
      { id: v4(), title: "Ecommerce", color: "bg-red-400" },
      { id: v4(), title: "Pinterest Clone", color: "bg-blue-400" },
    ],
    "in progress": [{ id: v4(), title: "Todo List", color: "bg-purple-400" }],
    done: [],
  });

  const onDragEnd = (result: DropResult) => {
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

  const editTitle = (newTitle: string, taskId: string) => {
    const copy = { ...data };
    for (let i = 0; i < Object.entries(copy).length; i++) {
      copy[Object.entries(copy)[i][0] as StatusType] = Object.entries(copy)[
        i
      ][1].map((item: ITask) =>
        item.id === taskId ? { ...item, title: newTitle } : item
      );
    }
    setData(copy);
  };

  const value: ITasksContext = {
    data,
    onDragEnd,
    editTitle,
  };

  return (
    <TasksContext.Provider value={value}>{children}</TasksContext.Provider>
  );
};