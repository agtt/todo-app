/**
 * @jest-environment node
 */
import { getCollection } from "@/libs/db";
import { getTodos, addTodo, toggleTodo, removeTodo } from "../todo";
import { ObjectId } from "mongodb";

jest.mock("@/libs/db");
jest.mock("mongodb", () => {
  const original = jest.requireActual("mongodb");
  return {
    ...original,
    MongoClient: jest.fn(),
    ObjectId: jest.fn((id) =>
      typeof id === "string"
        ? original.ObjectId.createFromHexString(id)
        : original.ObjectId(id),
    ),
  };
});

const mockCollection = {
  find: jest.fn().mockReturnThis(),
  toArray: jest.fn(),
  insertOne: jest.fn(),
  findOne: jest.fn(),
  updateOne: jest.fn(),
  deleteOne: jest.fn(),
};

const mockIdString = "507f1f77bcf86cd799439011";
const mockObjectId = new ObjectId(mockIdString);

describe("Todo Service", () => {
  beforeEach(() => {
    (getCollection as jest.Mock).mockResolvedValue(mockCollection);
    jest.clearAllMocks();
  });

  const setupMockTodo = (overrides = {}) => ({
    _id: mockObjectId,
    text: "Sample todo",
    done: false,
    ...overrides,
  });

  describe("getTodos", () => {
    it("returns todos array", async () => {
      const mockTodos = [
        setupMockTodo(),
        setupMockTodo({
          _id: new ObjectId("507f1f77bcf86cd799439012"),
          done: true,
        }),
      ];
      mockCollection.toArray.mockResolvedValue(mockTodos);

      const result = await getTodos();

      expect(getCollection).toHaveBeenCalledWith("todos");
      expect(mockCollection.find).toHaveBeenCalled();
      expect(result).toEqual(mockTodos);
    });

    it("returns empty array if no todos found", async () => {
      mockCollection.toArray.mockResolvedValue([]);

      const result = await getTodos();

      expect(result).toEqual([]);
    });
  });

  describe("addTodo", () => {
    it("adds new todo and returns id", async () => {
      mockCollection.insertOne.mockResolvedValue({ insertedId: mockObjectId });

      const result = await addTodo("New todo");

      expect(mockCollection.insertOne).toHaveBeenCalledWith({
        text: "New todo",
        done: false,
      });
      expect(result).toEqual(mockObjectId);
    });

    it("throws error if insertion fails", async () => {
      mockCollection.insertOne.mockImplementationOnce(() => {
        throw new Error("Failed to insert todo");
      });

      await expect(addTodo("Fail todo")).rejects.toThrow(
        "Failed to insert todo",
      );
    });
  });

  describe("toggleTodo", () => {
    it("toggles done status", async () => {
      mockCollection.findOne.mockResolvedValue(setupMockTodo({ done: false }));
      mockCollection.updateOne.mockResolvedValue({ modifiedCount: 1 });

      const result = await toggleTodo(mockIdString);

      expect(mockCollection.findOne).toHaveBeenCalledWith({
        _id: mockObjectId,
      });
      expect(mockCollection.updateOne).toHaveBeenCalledWith(
        { _id: mockObjectId },
        { $set: { done: true } },
      );
      expect(result).toBe(1);
    });

    it("throws error if todo not found", async () => {
      mockCollection.findOne.mockResolvedValue(null);

      await expect(toggleTodo(mockIdString)).rejects.toThrow("Todo not found");
      expect(mockCollection.updateOne).not.toHaveBeenCalled();
    });

    it("returns 0 if update does not modify document", async () => {
      mockCollection.findOne.mockResolvedValue(setupMockTodo());
      mockCollection.updateOne.mockResolvedValue({ modifiedCount: 0 });

      const result = await toggleTodo(mockIdString);

      expect(result).toBe(0);
    });
  });

  describe("removeTodo", () => {
    it("removes todo and returns deleted count", async () => {
      mockCollection.deleteOne.mockResolvedValue({ deletedCount: 1 });

      const result = await removeTodo(mockIdString);

      expect(mockCollection.deleteOne).toHaveBeenCalledWith({
        _id: mockObjectId,
      });
      expect(result).toBe(1);
    });

    it("returns 0 when no todo is deleted", async () => {
      mockCollection.deleteOne.mockResolvedValue({ deletedCount: 0 });

      const result = await removeTodo(mockIdString);

      expect(result).toBe(0);
    });
  });
});
