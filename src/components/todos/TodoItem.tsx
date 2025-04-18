import { ExtendedTodoItemProps } from "@/types/todo";
import { Trash2 } from "lucide-react";

export const TodoItem = ({
  todo,
  onToggle,
  onDelete,
  isLoading = false,
}: ExtendedTodoItemProps) => {
  return (
    <div className="flex items-center justify-between rounded-lg bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-center space-x-3">
        <input
          type="checkbox"
          checked={todo.done}
          onChange={() => onToggle(todo._id.toString())}
          className="h-5 w-5 rounded text-blue-600 focus:ring-blue-500"
          data-testid={`toggle-${todo._id}`}
          disabled={isLoading}
        />
        <span
          className={`text-lg ${todo.done ? "text-gray-500 line-through" : "text-gray-800"}`}
        >
          {todo.text}
        </span>
      </div>
      <button
        onClick={() => onDelete(todo._id.toString())}
        className="cursor-pointer text-red-500 transition-colors hover:text-red-700 disabled:cursor-not-allowed disabled:text-red-300"
        data-testid={`delete-${todo._id}`}
        disabled={isLoading}
      >
        <Trash2 className="h-5 w-5" />
      </button>
    </div>
  );
};
