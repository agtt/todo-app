import "server-only";

import { MongoClient, Collection, Document } from "mongodb";

const uri = process.env.DATABASE_URL!;
const client = new MongoClient(uri);

let isConnected = false;

const connect = async () => {
  if (!isConnected) {
    await client.connect();
    isConnected = true;
  }
};

const getDb = async () => {
  await connect();
  const dbName = uri.split("/").pop()?.split("?")[0];
  return client.db(dbName);
};

export const getCollection = async <T extends Document>(
  name: string,
): Promise<Collection<T>> => {
  const db = await getDb();
  return db.collection<T>(name);
};
