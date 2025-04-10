import { ObjectId } from "mongodb";

export interface ITodo {
  _id: ObjectId;
  text: string;
  done: boolean;
}

export interface TodoItemProps {
  todo: ITodo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}
