import { DocsAside } from "@/components/DocsAside";
import { ServiceClient } from "@/services/generated/client-ouch";
import { AwfulError, BadError, OuchError } from "@/services/generated/vo-ouch";
import { getClientWithTransportLog } from "@/services/transportWithLog";
import classes from "@/styles/Ouch.module.css";
import { useState } from "react";

const AwfulErrorComp = (err: AwfulError) => {
  return <div className={classes.errorAwful}>AWFUL ERROR</div>;
};

const BadErrorComp = (err: BadError) => {
  return <div className={classes.errorBad}>BAD ERROR - cause: {err.cause}</div>;
};

const getComponentForErr = (
  err?: OuchError
): React.FunctionComponent<OuchError> | null => {
  if (!err) {
    return null;
  }
  switch (err?.kind) {
    case "AwfulError":
      return AwfulErrorComp as React.FunctionComponent<OuchError>;
    case "BadError":
      return BadErrorComp as React.FunctionComponent<OuchError>;
    default:
      return null;
  }
};

const client = getClientWithTransportLog(ServiceClient);

const Ouch = () => {
  const [err, setErr] = useState<OuchError | null>(null);

  const ErrComp = getComponentForErr(err!);
  return (
    <div>
      <DocsAside examplePage="ouch">
        This example shows gotsrpc&apos;s union feature for errors
        <ul>
          <li>Every call will result in an error</li>
          <li>the error uses gotsrpc union feature</li>
          <li>
            Use this feature to handle errors from complex underlying domains
          </li>
        </ul>
      </DocsAside>
      <button
        onClick={(_) => {
          client.whatCouldGoWrong().then(setErr);
          setErr(null);
        }}
      >
        what could go wrong?
      </button>
      {err && ErrComp && <ErrComp {...err} />}
    </div>
  );
};

export default Ouch;
