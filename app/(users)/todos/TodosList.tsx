import Link from "next/link";
import React from "react";
import { Todo } from "../../../typings";

const fetchTodos = async () => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/todos/`);
  const todos: Todo[] = await res.json();
  return todos;
};

const TodosList = async () => {
  const todos = await fetchTodos();

  return (
    <div>
      {todos.map((todo) => {
        return (
          <p key={todo.id}>
            <Link href={`/todos/${todo.id}`}>Todo: {todo.id}</Link>
          </p>
        );
      })}
    </div>
  );
};

export default TodosList;
