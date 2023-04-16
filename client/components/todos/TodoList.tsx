import { TodoID, Todos } from "@/services/generated/vo-todos";
import { Todo } from "./Todo";


export const TodoList = (props: {
    todos: Todos | null;
    onDeleteTodo: (id: TodoID) => void;
    onCompleteTodo: (id: TodoID, complete: boolean) => void;
  }) => {
    const { todos } = props;
    if (todos === null) {
      return null;
    }
    return (
      <>
        {todos.length == 0 ? (
          <div>nothing left to do</div>
        ) : (
          todos.map((todo, index) => (
            <Todo
              key={todo.id}
              index={index}
              todo={todo}
              onDelete={() => props.onDeleteTodo(todo.id)}
              onComplete={() => props.onCompleteTodo(todo.id, !todo.complete)}
            />
          ))
        )}
      </>
    );
  };