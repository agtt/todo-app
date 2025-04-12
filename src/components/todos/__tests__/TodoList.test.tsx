import { render, screen, fireEvent } from "@testing-library/react";
import { useTodo } from "@/hooks/useTodo";
import TodoList from "../TodoList";

// Mock the useTodo hook
jest.mock("@/hooks/useTodo", () => ({
  useTodo: jest.fn(),
}));

describe("TodoList", () => {
  const mockUseTodo = useTodo as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseTodo.mockReturnValue({
      todos: [],
      isLoading: false,
      newTodoText: "",
      setNewTodoText: jest.fn(),
      handleAddTodo: jest.fn(),
      handleToggleTodo: jest.fn(),
      handleDeleteTodo: jest.fn(),
    });
  });

  it("renders loading state", () => {
    mockUseTodo.mockReturnValue({
      ...mockUseTodo(),
      isLoading: true,
    });

    render(<TodoList />);
    expect(screen.getByTestId("loading")).toBeInTheDocument();
  });

  it("renders empty state message when no todos", () => {
    render(<TodoList />);
    expect(
      screen.getByText("No tasks available. Add a new task to get started!"),
    ).toBeInTheDocument();
  });

  it("renders todo items when todos exist", () => {
    const mockTodos = [
      { _id: "1", text: "Todo 1", done: false },
      { _id: "2", text: "Todo 2", done: true },
    ];

    mockUseTodo.mockReturnValue({
      ...mockUseTodo(),
      todos: mockTodos,
    });

    render(<TodoList />);
    expect(screen.getByText("Todo 1")).toBeInTheDocument();
    expect(screen.getByText("Todo 2")).toBeInTheDocument();
  });

  it("calls handleAddTodo when adding a new todo", () => {
    const handleAddTodo = jest.fn();
    mockUseTodo.mockReturnValue({
      ...mockUseTodo(),
      handleAddTodo,
    });

    render(<TodoList />);
    const addButton = screen.getByTestId("add-todo-button");
    fireEvent.click(addButton);

    expect(handleAddTodo).toHaveBeenCalled();
  });
});
