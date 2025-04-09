"use client";
import { useState } from "react";
import { api } from "@/trpc/react";
import { TodoItem } from "./TodoItem";

const TodoList = () => {
  const [newTodoText, setNewTodoText] = useState("");

  const utils = api.useUtils();
  const { data: todos = [] } = api.todo.getAll.useQuery();
  const { mutate: addTodo } = api.todo.add.useMutation({
    onSuccess: () => {
      setNewTodoText("");
      void utils.todo.getAll.invalidate();
    },
  });
  const { mutate: toggleTodo } = api.todo.toggle.useMutation({
    onSuccess: () => {
      void utils.todo.getAll.invalidate();
    },
  });
  const { mutate: removeTodo } = api.todo.remove.useMutation({
    onSuccess: () => {
      void utils.todo.getAll.invalidate();
    },
  });

  const handleAddTodo = () => {
    if (!newTodoText.trim()) return;
    addTodo({ text: newTodoText });
  };

  const handleToggleTodo = (id: string) => toggleTodo({ id });

  const handleDeleteTodo = (id: string) => removeTodo({ id });

  return (
    <div className="mx-auto max-w-2xl p-6">
      <h1 className="mb-8 text-center text-3xl font-bold text-gray-800">
        Todo List
      </h1>

      <div className="mb-6 flex gap-2">
        <input
          type="text"
          value={newTodoText}
          onChange={(e) => setNewTodoText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAddTodo()}
          placeholder="Add a new task..."
          className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none text-black"
        />
        <button
          onClick={handleAddTodo}
          className="rounded-lg bg-blue-500 px-6 py-2 text-white transition-colors hover:bg-blue-600"
        >
          Add
        </button>
      </div>

      <div className="space-y-3">
        {todos.length === 0 && (
          <div className="text-center text-gray-500">
            No tasks available. Add a new task to get started!
          </div>
        )}
        {todos.map((todo) => (
          <TodoItem
            key={todo._id.toString()}
            todo={todo}
            onToggle={handleToggleTodo}
            onDelete={handleDeleteTodo}
          />
        ))}
      </div>
    </div>
  );
};

export default TodoList;
