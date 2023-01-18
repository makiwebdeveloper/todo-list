import { FC } from "react";
import { ITask } from "../types";

interface Props {
  task: ITask;
}

const TaskItem: FC<Props> = ({ task }) => {
  return (
    <label
      className={`${task.color} font-semibold rounded-xl p-3 shadow-lg cursor-pointer`}
    >
      <textarea
        value={task.title}
        className="resize-none bg-transparent outline-none cursor-pointer"
      />
    </label>
  );
};

export default TaskItem;
