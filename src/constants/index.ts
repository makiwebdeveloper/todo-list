import { v4 } from "uuid";

export const fakeData = {
  todo: [
    { id: v4(), title: "Ecommerce", color: "bg-red-400" },
    { id: v4(), title: "Pinterest Clone", color: "bg-blue-400" },
  ],
  "in progress": [{ id: v4(), title: "Todo List", color: "bg-purple-400" }],
  done: [],
};

export const colors = [
  "bg-teal-400",
  "bg-blue-400",
  "bg-purple-400",
  "bg-pink-400",
  "bg-red-400",
  "bg-orange-400",
  "bg-green-400",
];
