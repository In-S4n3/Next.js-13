import React from "react";
import { PageProps, Todo } from "../../../../typings";
import { notFound } from "next/navigation";

//serve the SSR a page
export const dynamicParams = true;

/**To use the old functions of Next
 * SSR: {cache: 'no-cache'}
 * SSG: {cache: 'force-cache'}
 * ISR: {next: {revalidate 'number of seconds' }}
 */

const fetchTodoById = async (id: string) => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
    next: { revalidate: 60 },
  });
  const singleTodo: Todo = await res.json();
  return singleTodo;
};

const TodoPage = async ({ params: { todoId } }: PageProps) => {
  const singleTodo = await fetchTodoById(todoId);

  if (!singleTodo.id) notFound();

  return (
    <div className="min-h-[90vh] flex justify-center items-center">
      <div className="text-xl bg-yellow-400 p-20 rounded-lg space-y-2 w-[500px]">
        <p>#{singleTodo.id}</p>
        <p>
          <span className="font-bold">Title</span>: {singleTodo.title}
        </p>
        <p>
          <span className="font-bold">Completed</span>:{" "}
          {singleTodo.completed ? "Yes" : "No"}
        </p>
        <hr />
        <p className="float-right">
          <span className="font-bold">By user</span>: {singleTodo.userId}
        </p>
      </div>
    </div>
  );
};

export default TodoPage;

/** new generation static paths
 * to see this working we have to do a npm run build and then npm run start. in dev it always run in the server
 */
export async function generateStaticParams() {
  const res = await fetch(`https://jsonplaceholder.typicode.com/todos/`);
  const todos: Todo[] = await res.json();

  // to limit the calls of the API, also, once we are only mapping throw the first 10 items the ones after will be render a bit slower until they're cached
  const trimmedTodos = todos.slice(0, 10);

  /**we have to use toString() to not have an error */
  return trimmedTodos.map((todo) => {
    return { todoId: todo.id.toString() };
  });
}
