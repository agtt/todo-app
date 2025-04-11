import "server-only";
import { MongoClient, Collection, Document } from "mongodb";

export const getMongoClient = (uri: string) => new MongoClient(uri);

let client: MongoClient;
let isConnected = false;

export const connect = async (uri: string) => {
  if (!client) {
    client = getMongoClient(uri);
  }
  if (!isConnected) {
    await client.connect();
    isConnected = true;
  }
};

export const getDb = async (uri: string) => {
  await connect(uri);
  const dbName = new URL(uri).pathname.replace(/^\//, '');
  return client.db(dbName);
};

export const getCollection = async <T extends Document>(
  name: string,
  uri: string = process.env.DATABASE_URL!
): Promise<Collection<T>> => {
  if (!uri) {
    throw new Error("DATABASE_URL environment variable is not defined");
  }
  const db = await getDb(uri);
  return db.collection<T>(name);
};