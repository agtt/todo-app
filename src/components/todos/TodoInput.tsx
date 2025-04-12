import { TodoInputProps } from "@/types/todo";
import { ChangeEvent, KeyboardEvent } from "react";

export const TodoInput = ({
  value,
  onChange,
  onAdd,
  isLoading = false,
}: TodoInputProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onAdd();
    }
  };

  return (
    <div className="mb-6 flex gap-2">
      <input
        type="text"
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="Add a new task..."
        className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-black focus:ring-2 focus:ring-blue-500 focus:outline-none"
        data-testid="todo-input"
        disabled={isLoading}
      />
      <button
        onClick={onAdd}
        className="rounded-lg bg-blue-500 px-6 py-2 text-white transition-colors hover:bg-blue-600 disabled:bg-blue-300"
        data-testid="add-todo-button"
        disabled={isLoading}
      >
        Add
      </button>
    </div>
  );
};
