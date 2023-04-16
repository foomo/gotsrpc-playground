import classes from "@/styles/Components.module.css";

export const TransportError = (props: { error: string }) => {
    return (
      <>
        {props.error && (
          <div className={classes.transportError}>{props.error}</div>
        )}
      </>
    );
  };