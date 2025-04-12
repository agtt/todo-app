import { render, screen, fireEvent } from "@testing-library/react";
import { TodoInput } from "../TodoInput";

describe("TodoInput", () => {
  const mockOnChange = jest.fn();
  const mockOnAdd = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders input and button", () => {
    render(<TodoInput value="" onChange={mockOnChange} onAdd={mockOnAdd} />);

    expect(screen.getByTestId("todo-input")).toBeInTheDocument();
    expect(screen.getByTestId("add-todo-button")).toBeInTheDocument();
  });

  it("calls onChange when input value changes", () => {
    render(<TodoInput value="" onChange={mockOnChange} onAdd={mockOnAdd} />);

    const input = screen.getByTestId("todo-input");
    fireEvent.change(input, { target: { value: "New todo" } });

    expect(mockOnChange).toHaveBeenCalledWith("New todo");
  });

  it("calls onAdd when button is clicked", () => {
    render(
      <TodoInput value="New todo" onChange={mockOnChange} onAdd={mockOnAdd} />,
    );

    const button = screen.getByTestId("add-todo-button");
    fireEvent.click(button);

    expect(mockOnAdd).toHaveBeenCalled();
  });

  it("calls onAdd when Enter key is pressed", () => {
    render(
      <TodoInput value="New todo" onChange={mockOnChange} onAdd={mockOnAdd} />,
    );

    const input = screen.getByTestId("todo-input");
    fireEvent.keyDown(input, { key: "Enter" });

    expect(mockOnAdd).toHaveBeenCalled();
  });
});
