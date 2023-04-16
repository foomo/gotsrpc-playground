import { DocsAside } from "@/components/DocsAside";
import { SimpleForm } from "@/components/SimpleForm";
import { TransportError } from "@/components/TransportError";
import { TodoError } from "@/components/todos/TodoError";
import { TodoList } from "@/components/todos/TodoList";
import { ServiceClient } from "@/services/generated/client-todos";
import { Error, TodoID, Todos } from "@/services/generated/vo-todos";
import { getClientWithTransportLog } from "@/services/transportWithLog";

import { useEffect, useState } from "react";

const client = getClientWithTransportLog(ServiceClient);

type TodoReturnType = {
  todos: Todos | null;
  err: Error | null;
};
type TodoClientPromise = Promise<TodoReturnType>;

const Todos = () => {
  // local react state:
  const [active, setActive] = useState(false);
  // list of todos
  const [todos, setTodos] = useState<Todos | null>(null);
  // method error handling
  const [error, setError] = useState<Error | null | undefined>(undefined);
  // transport error handling
  const [transportError, setTransportError] = useState<string>("");

  // all methods of the todo service return the same type
  // and thus the resulting promises can be handled with the same function
  const handleTodoClientPromise = (promise: TodoClientPromise) => {
    // to give the user instant feedback, that he successfully triggered an interaction,
    // we reset, the current state and set active to true
    setError(null);
    setTodos(null);
    setActive(true);

    // wire up the promise
    promise
      .then((value: TodoReturnType) => {
        // handle a successful response
        setError(value.err);
        setTodos(value.todos);
      })
      .catch((e: any) => {
        // a transport error is not a business error and has to be handled separately
        setTransportError(
          "a transport error occurred - please reload the page: " + e
        );
      })
      .finally(() => {
        // no matter, if things worked or not, we are not active any more
        setActive(false);
      });
  };

  // initial load of todos
  useEffect(() => {
    handleTodoClientPromise(client.getTodos());
  }, []);

  return (
    <>
      <DocsAside anchor="todos">
        This is a simple application, that includes error handling
        <ul>
          <li>
            all responses are slowed down by a server side sleep of 1s - to
            illustrate the request / response lifecycle
          </li>
          <li>
            you can trigger a <code>500 server error</code> by entering{" "}
            <q>500</q> as a todo
          </li>
          <li>
            submitting an empty todo will trigger an <code>ErrCreateEmpty</code>
          </li>
          <li>
            submitting a duplicate todo will trigger an{" "}
            <code>ErrCreateDuplicate</code>
          </li>
        </ul>
      </DocsAside>

      <SimpleForm
        onCreate={(text) => handleTodoClientPromise(client.createTodo(text))}
        placeholder="new todo"
        enabled={!active}
      />

      {active ? (
        <p>service call in progress</p>
      ) : (
        <>
          <TransportError error={transportError} />
          <TodoError error={error} />
        </>
      )}

      <TodoList
        todos={todos}
        onDeleteTodo={(id: TodoID) =>
          handleTodoClientPromise(client.deleteTodo(id))
        }
        onCompleteTodo={(id: TodoID, complete: boolean) =>
          handleTodoClientPromise(client.setComplete(id, complete))
        }
      />
    </>
  );
};

export default Todos;
