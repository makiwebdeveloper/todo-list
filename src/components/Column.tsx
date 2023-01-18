import { FC } from "react";
import { ITask } from "../types";
import classNames from "classnames";
import TaskItem from "./TaskItem";

interface Props {
  tasks: ITask[];
  columnName: string;
}

const Column: FC<Props> = ({ tasks, columnName }) => {
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
      <button className="bg-gray-200 w-full rounded-md my-3 font-semibold text-gray-700">
        +
      </button>
      <div className="flex flex-col gap-3">
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};

export default Column;
