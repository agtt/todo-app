import { render, screen, fireEvent } from "@testing-library/react";
import { TodoItem } from "../TodoItem";
import { ObjectId } from "mongodb";

jest.mock("mongodb", () => ({
  ObjectId: jest.fn(() => ({
    toString: () => "1",
  })),
}));

describe("TodoItem", () => {
  const mockTodo = {
    _id: new ObjectId("1"),
    text: "Test todo",
    done: false,
  };

  const mockOnToggle = jest.fn();
  const mockOnDelete = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders todo item with correct text", () => {
    render(
      <TodoItem
        todo={mockTodo}
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
      />,
    );

    expect(screen.getByText("Test todo")).toBeInTheDocument();
  });

  it("calls onToggle when checkbox is clicked", () => {
    render(
      <TodoItem
        todo={mockTodo}
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
      />,
    );

    const checkbox = screen.getByTestId("toggle-1");
    fireEvent.click(checkbox);

    expect(mockOnToggle).toHaveBeenCalledWith("1");
  });

  it("calls onDelete when delete button is clicked", () => {
    render(
      <TodoItem
        todo={mockTodo}
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
      />,
    );

    const deleteButton = screen.getByTestId("delete-1");
    fireEvent.click(deleteButton);

    expect(mockOnDelete).toHaveBeenCalledWith("1");
  });

  it("applies line-through style when todo is done", () => {
    const doneTodo = { ...mockTodo, done: true };
    render(
      <TodoItem
        todo={doneTodo}
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
      />,
    );

    const todoText = screen.getByText("Test todo");
    expect(todoText).toHaveClass("line-through");
  });
});
