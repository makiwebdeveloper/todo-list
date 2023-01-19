import { FC, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { ITask } from "../types";
import TextareaAutosize from "react-textarea-autosize";
import { AiOutlineEdit, AiOutlineCheck } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";
import { useTasks } from "../contexts/TasksContext";

interface Props {
  task: ITask;
  index: number;
}

const TaskItem: FC<Props> = ({ task, index }) => {
  const { editTitle, removeTask } = useTasks();
  const [isEdit, setIsEdit] = useState(false);
  const [value, setValue] = useState("");

  const saveEditedTitle = () => {
    editTitle(value, task.id);
    setValue("");
  };

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
          className={`${task.color} font-semibold rounded-xl p-3 shadow-lg cursor-pointer mb-3`}
        >
          <div className="flex justify-between gap-3 items-start">
            <p className="break-all">{task.title}</p>
            <div className="flex items-center gap-1">
              <button onClick={() => setIsEdit((prev) => !prev)}>
                {isEdit ? (
                  <AiOutlineCheck onClick={saveEditedTitle} />
                ) : (
                  <AiOutlineEdit />
                )}
              </button>
              <button onClick={() => removeTask(task.id)}>
                <BsTrash />
              </button>
            </div>
          </div>
          {isEdit && (
            <TextareaAutosize
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Edit title"
              className="w-full py-1 text-sm placeholder-black mt-3 bg-transparent outline-none border-t border-b border-black resize-none"
            />
          )}
        </div>
      )}
    </Draggable>
  );
};

export default TaskItem;
