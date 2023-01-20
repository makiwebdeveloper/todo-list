import { FC } from "react";
import { ITask, StatusType } from "../types";
import classNames from "classnames";
import TaskItem from "./TaskItem";
import { Droppable } from "react-beautiful-dnd";
import { useTasks } from "../contexts/TasksContext";

interface Props {
  tasks: ITask[];
  columnName: StatusType;
}

const Column: FC<Props> = ({ tasks, columnName }) => {
  const { createTask } = useTasks();

  return (
    <div className="flex-1 bg-gray-100 p-3 rounded-xl">
      <p
        className={`px-3 w-fit py-1 rounded-xl uppercase font-semibold text-sm ${classNames(
          { "bg-gray-200": columnName === "todo" },
          { "bg-blue-200": columnName === "in progress" },
          { "bg-green-200": columnName === "done" }
        )}`}
      >
        {columnName}
      </p>
      <button
        onClick={() => createTask(columnName)}
        className="bg-gray-200 w-full rounded-md my-3 font-semibold text-gray-700"
      >
        +
      </button>
      <Droppable droppableId={columnName}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="h-[calc(100%-80px)]"
          >
            {tasks.map((task, index) => (
              <TaskItem key={task.id} task={task} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default Column;
