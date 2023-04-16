import { DocsAside } from "@/components/DocsAside";
import { ServiceClient } from "@/services/generated/client-playground";
import { getClient } from "@/services/transport";
import { getClientWithTransportLog } from "@/services/transportWithLog";
import classes from "@/styles/Playground.module.css";
import { useEffect, useState } from "react";

// prettier-ignore
const preFormattedDocs = `
client/
  pages/plaground.tsx - what you are looking at
  styles/Playground.module.css - for styling

server/
  services/playground/service.go - your service interface
  server/server/plaground.go - your service implemetation
`;

const client = getClientWithTransportLog(ServiceClient);

const Playground = () => {
  const [callToAction, setCallToAction] = useState(
    "... loading call to action"
  );
  useEffect(() => {
    client.implementMe().then(setCallToAction);
  }, []);
  return (
    <>
      <DocsAside>
        <p>Here is a playground just for you ❤️</p>
        <p>start hacking here:</p>
        <code>
          <pre>{preFormattedDocs}</pre>
        </code>
        <p>
          Find instructions on running the playground in the{" "}
          <a href="https://github.com/foomo/gotsrpc-playground/README.md">README.md</a>{" "}
          of the project
        </p>
      </DocsAside>
      <div className={classes.callToAction}>{callToAction}</div>
    </>
  );
};
export default Playground;
