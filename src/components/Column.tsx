import { FC } from "react";
import { ITodo } from "../types";
import TodoItem from "./TodoItem";

interface Props {
  column: {
    name: string;
    todos: ITodo[];
  };
}

const Column: FC<Props> = ({ column }) => {
  return (
    <div className="flex-1 bg-neutral-800 mt-10 rounded">
      <p className="bg-neutral-700 text-center p-4 text-xl rounded-t">
        {column.name}
      </p>
      <div className="p-5 flex flex-col gap-5">
        {column.todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </div>
    </div>
  );
};

export default Column;
