import { ITodo } from "@/types/todo";

interface TodoItemProps {
  todo: ITodo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export const TodoItem = ({ todo, onToggle, onDelete }: TodoItemProps) => {
  return (
    <div className="flex items-center justify-between rounded-lg bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-center space-x-3">
        <input
          type="checkbox"
          checked={todo.done}
          onChange={() => onToggle(todo._id.toString())}
          className="h-5 w-5 rounded text-blue-600 focus:ring-blue-500"
        />
        <span
          className={`text-lg ${todo.done ? "text-gray-500 line-through" : "text-gray-800"}`}
        >
          {todo.text}
        </span>
      </div>
      <button
        onClick={() => onDelete(todo._id.toString())}
        className="text-red-500 transition-colors hover:text-red-700"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  );
};
