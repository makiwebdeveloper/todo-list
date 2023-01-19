import { createContext, FC, useContext, useState } from "react";
import { IData, ITask, StatusType } from "../types";
import { v4 } from "uuid";
import { DropResult } from "react-beautiful-dnd";
import { colors, fakeData } from "../constants";

interface ITasksContext {
  data: IData;
  onDragEnd: (result: DropResult) => void;
  editTitle: (newTitle: string, taskId: string) => void;
  removeTask: (taskId: string) => void;
  changeColor: (taskId: string) => void;
  createTask: (columnName: StatusType) => void;
  colorIndex: number;
}

const TasksContext = createContext<ITasksContext | null>(null);
export const useTasks = () => useContext(TasksContext) as ITasksContext;

export const TasksProvider: FC = ({ children }) => {
  const [data, setData] = useState<IData>(fakeData);
  const [colorIndex, setColorIndex] = useState(0);

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

  const removeTask = (taskId: string) => {
    const copy = { ...data };
    for (let i = 0; i < Object.entries(copy).length; i++) {
      copy[Object.entries(copy)[i][0] as StatusType] = Object.entries(copy)[
        i
      ][1].filter((item: ITask) => item.id !== taskId);
    }
    setData(copy);
  };

  const createTask = (columnName: StatusType) => {
    setData({
      ...data,
      [columnName]: [
        {
          id: v4(),
          title: "New Task",
          color: colors[Math.floor(Math.random() * colors.length)],
        },
        ...data[columnName],
      ],
    });
  };

  const changeColor = (taskId: string) => {
    const copy = { ...data };
    for (let i = 0; i < Object.entries(copy).length; i++) {
      copy[Object.entries(copy)[i][0] as StatusType] = Object.entries(copy)[
        i
      ][1].map((item: ITask) =>
        item.id === taskId ? { ...item, color: colors[colorIndex] } : item
      );
    }
    setData(copy);
    setColorIndex((prev) => (prev < colors.length - 1 ? prev + 1 : 0));
  };

  const value: ITasksContext = {
    data,
    onDragEnd,
    editTitle,
    removeTask,
    createTask,
    changeColor,
    colorIndex,
  };

  return (
    <TasksContext.Provider value={value}>{children}</TasksContext.Provider>
  );
};
