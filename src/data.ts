import { v4 } from "uuid";

export const data = {
  [v4()]: {
    name: "Todo",
    todos: [
      {
        id: v4(),
        title: "Ecommerce",
        description: "Description",
      },
      {
        id: v4(),
        title: "Pinterest clone",
        description: "Description",
      },
    ],
  },
  [v4()]: {
    name: "In Progress",
    todos: [
      {
        id: v4(),
        title: "Todo List",
        description: "Description",
      },
    ],
  },
  [v4()]: {
    name: "Done",
    todos: [],
  },
};
