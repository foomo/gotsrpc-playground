import { Error } from "@/services/generated/vo-todos";
import classes from "@/styles/Todos.module.css";

export const TodoError = (props: { error: Error | null | undefined }) => {
    if (props.error === undefined) {
      return null;
    }
    let msg = "it worked";
    switch (props.error) {
      case Error.ErrCreateDuplicate:
        msg = "a todo with the given text already existed";
        break;
      case Error.ErrCreateEmpty:
        msg = "a todo can not be created with en empty text";
        break;
      case Error.ErrNotFound:
        msg =
          "your request could not be completed, because the todo was not found";
        break;
      case null:
    }
    return (
      <>
        {props.error ? (
          <div className={classes.error}>
            ERROR: {msg} (<small>{props.error}</small>){" "}
          </div>
        ) : (
          <div className={classes.success}>
            last call has succeeded (that might have been, as the page loadded)
          </div>
        )}
      </>
    );
  };