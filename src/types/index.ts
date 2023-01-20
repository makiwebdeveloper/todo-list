export interface ITask {
  id: string;
  title: string;
  color: string;
}

export type StatusType = "todo" | "in progress" | "done";

export interface IData {
  todo: ITask[];
  "in progress": ITask[];
  done: ITask[];
}
