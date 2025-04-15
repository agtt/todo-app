import { getCollection, getDb } from "../db";
import { MongoClient } from "mongodb";

jest.mock("mongodb", () => ({
  MongoClient: jest.fn().mockImplementation(() => ({
    connect: jest.fn().mockResolvedValue(undefined),
    db: jest.fn().mockReturnValue({
      collection: jest.fn().mockImplementation((name) => name),
    }),
  })),
}));

describe("Database Utilities", () => {
  const testCollectionName = "test-collection";
  const testDbName = "test-db";
  const testUri = `mongodb://localhost:27017/${testDbName}`;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getDb", () => {
    it("should connect to the database using the provided URI", async () => {
      await getDb(testUri);
      expect(MongoClient).toHaveBeenCalledWith(testUri);
    });
  });

  describe("getCollection", () => {
    it("should return the specified collection", async () => {
      const collection = await getCollection(testCollectionName, testUri);
      expect(collection).toBe(testCollectionName);
    });

    it("should throw error when no URI is provided", async () => {
      await expect(getCollection(testCollectionName, "")).rejects.toThrow(
        "DATABASE_URL environment variable is not defined",
      );
    });
  });
});
