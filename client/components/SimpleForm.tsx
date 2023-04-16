import { useRef } from "react";

export const SimpleForm = (props: {
  placeholder: string;
  onCreate: (newTodo: string) => void;
  enabled?: boolean;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (inputRef.current) {
          props.onCreate(inputRef.current.value);
          inputRef.current.value = "";
        }
      }}
    >
      <input
        placeholder={props.placeholder}
        ref={inputRef}
        disabled={props.enabled === false}
      />
    </form>
  );
};
