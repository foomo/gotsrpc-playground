import { Todo as TodoType } from "@/services/generated/vo-todos";
import { formatDistanceToNow } from "date-fns";
import classes from "@/styles/Todos.module.css";

export const Todo = (props: {
    todo: TodoType;
    index: number;
    onComplete: () => void;
    onDelete: () => void;
  }) => {
    const { todo, index } = props;
    return (
      <div className={classes.todo} key={todo.id}>
        <div className={classes.todoLabel}>
          {todo.text} &nbsp;
        </div>
        <div>
          {formatDistanceToNow(new Date(todo.created))} &nbsp;
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              props.onComplete();
            }}
          >
            {" "}
            {todo.complete ? "✅" : "☑️"}{" "}
          </button>
          &nbsp;
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              props.onDelete();
            }}
          >
            🗑️
          </button>
        </div>
      </div>
    );
  };