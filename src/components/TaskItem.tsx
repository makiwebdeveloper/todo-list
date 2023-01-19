import { FC, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { ITask } from "../types";
import TextareaAutosize from "react-textarea-autosize";
import { AiOutlineEdit, AiOutlineCheck } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";

interface Props {
  task: ITask;
  index: number;
}

const TaskItem: FC<Props> = ({ task, index }) => {
  const [isEdit, setIsEdit] = useState(false);

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
          className={`${task.color} font-semibold rounded-xl p-3 shadow-lg cursor-pointer mb-3`}
        >
          <div className="flex justify-between items-center">
            <p>{task.title}</p>
            <div className="flex items-center gap-1">
              <button onClick={() => setIsEdit((prev) => !prev)}>
                {isEdit ? <AiOutlineCheck /> : <AiOutlineEdit />}
              </button>
              <button>
                <BsTrash />
              </button>
            </div>
          </div>
          {isEdit && (
            <TextareaAutosize
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
