import { ITodo } from "@/types/todo";
import { render, screen, fireEvent } from "@testing-library/react";
import { TodoItem } from "../TodoItem";

describe("TodoItem", () => {
  const mockTodo: ITodo = {
    _id: "123132",
    text: "Test todo",
    done: false,
  } as unknown as ITodo;

  const onToggle = jest.fn();
  const onDelete = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders todo text", () => {
    render(
      <TodoItem todo={mockTodo} onToggle={onToggle} onDelete={onDelete} />,
    );
    expect(screen.getByText("Test todo")).toBeInTheDocument();
  });

  it("calls onToggle when checkbox is clicked", () => {
    render(
      <TodoItem todo={mockTodo} onToggle={onToggle} onDelete={onDelete} />,
    );
    const checkbox = screen.getByRole("checkbox");
    fireEvent.click(checkbox);
    expect(onToggle).toHaveBeenCalledWith(mockTodo._id.toString());
  });

  it("calls onDelete when trash icon is clicked", () => {
    render(
      <TodoItem todo={mockTodo} onToggle={onToggle} onDelete={onDelete} />,
    );
    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(onDelete).toHaveBeenCalledWith(mockTodo._id.toString());
  });

  it("applies line-through and gray text when todo is done", () => {
    const doneTodo = { ...mockTodo, done: true };
    render(
      <TodoItem todo={doneTodo} onToggle={onToggle} onDelete={onDelete} />,
    );
    const todoText = screen.getByText("Test todo");
    expect(todoText).toHaveClass("line-through");
    expect(todoText).toHaveClass("text-gray-500");
  });
});
