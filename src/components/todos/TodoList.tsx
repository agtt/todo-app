"use client";
import { useTodo } from "@/hooks/useTodo";
import { TodoItem } from "./TodoItem";
import { TodoInput } from "./TodoInput";
import { Loading } from "../ui";

const TodoList = () => {
  const {
    todos,
    isLoading,
    newTodoText,
    setNewTodoText,
    handleAddTodo,
    handleToggleTodo,
    handleDeleteTodo,
  } = useTodo();

  return (
    <div className="mx-auto max-w-2xl p-6">
      <h1 className="mb-8 text-center text-3xl font-bold text-gray-800">
        Todo List
      </h1>

      <TodoInput
        value={newTodoText}
        onChange={setNewTodoText}
        onAdd={handleAddTodo}
        isLoading={isLoading}
      />

      {isLoading && <Loading />}

      <div className="space-y-3">
        {todos.length === 0 && !isLoading && (
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
            isLoading={isLoading}
          />
        ))}
      </div>
    </div>
  );
};

export default TodoList;
