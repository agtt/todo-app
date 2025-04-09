import { ObjectId } from "mongodb";

export interface ITodo {
  _id: ObjectId;
  text: string;
  done: boolean;
}
