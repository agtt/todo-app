import { useState, useEffect } from "react";
import { api } from "@/trpc/react";
import type { ITodo } from "@/types/todo";

export const useTodo = () => {
  const [newTodoText, setNewTodoText] = useState("");
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Initial fetch
  const { data: initialTodos = [] } = api.todo.getAll.useQuery();

  // Update local state when initial data is loaded
  useEffect(() => {
    if (initialTodos.length > 0) {
      setTodos(initialTodos);
      setIsLoading(false);
    }
  }, [initialTodos]);

  const { mutate: addTodo, isPending: isAddingTodo } = api.todo.add.useMutation(
    {
      onSuccess: (newTodo) => {
        const todo: ITodo = {
          _id: newTodo.id,
          text: newTodoText,
          done: false,
        };
        setTodos((prev) => [...prev, todo]);
        setNewTodoText("");
      },
    },
  );

  const { mutate: toggleTodo, isPending: isTogglingTodo } =
    api.todo.toggle.useMutation({
      onSuccess: (_, variables) => {
        setTodos((prev) =>
          prev.map((todo) =>
            todo._id.toString() === variables.id
              ? { ...todo, done: !todo.done }
              : todo,
          ),
        );
      },
    });

  const { mutate: removeTodo, isPending: isRemovingTodo } =
    api.todo.remove.useMutation({
      onSuccess: (_, variables) => {
        setTodos((prev) =>
          prev.filter((todo) => todo._id.toString() !== variables.id),
        );
      },
    });

  const handleAddTodo = () => {
    if (!newTodoText.trim()) return;
    addTodo({ text: newTodoText });
  };

  const handleToggleTodo = (id: string) => toggleTodo({ id });
  const handleDeleteTodo = (id: string) => removeTodo({ id });

  const isProcessing = isAddingTodo || isTogglingTodo || isRemovingTodo;

  return {
    todos,
    isLoading: isLoading || isProcessing,
    newTodoText,
    setNewTodoText,
    handleAddTodo,
    handleToggleTodo,
    handleDeleteTodo,
  };
};
