import { FC } from "react";
import { ITodo } from "../types";

interface Props {
  todo: ITodo;
}

const TodoItem: FC<Props> = ({ todo }) => {
  return <div className="bg-neutral-700 rounded p-4">{todo.title}</div>;
};

export default TodoItem;
