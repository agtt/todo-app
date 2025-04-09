import "server-only";

import { ObjectId } from "mongodb";
import { getCollection } from "../db";
import { ITodo } from "@/types/todo";

const COLLECTION_NAME = "todos";

export const getTodos = async (): Promise<ITodo[]> => {
  const collection = await getCollection<ITodo>(COLLECTION_NAME);
  return collection.find().toArray();
};

export const addTodo = async (text: string): Promise<ObjectId> => {
  const collection = await getCollection<ITodo>(COLLECTION_NAME);
  const result = await collection.insertOne({ text, done: false } as ITodo);
  return result.insertedId;
};

export const toggleTodo = async (id: string): Promise<number> => {
  const collection = await getCollection<ITodo>(COLLECTION_NAME);
  const _id = new ObjectId(id);
  const doc = await collection.findOne({ _id });
  if (!doc) throw new Error("Todo not found");
  const result = await collection.updateOne(
    { _id },
    { $set: { done: !doc.done } },
  );
  return result.modifiedCount;
};

export const removeTodo = async (id: string): Promise<number> => {
  const collection = await getCollection<ITodo>(COLLECTION_NAME);
  const _id = new ObjectId(id);
  const result = await collection.deleteOne({ _id });
  return result.deletedCount;
};
