import { DocsAside } from "@/components/DocsAside";
import { ServiceClient } from "@/services/generated/client-playground";
import { Greeting } from "@/services/generated/vo-playground";
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
  const [greeting, setGreeting] = useState<Greeting | undefined>();
  useEffect(() => {
    client.implementMe().then(setGreeting);
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
          <a href="https://github.com/foomo/gotsrpc-playground/#readme">
            README.md
          </a>{" "}
          of the project
        </p>
      </DocsAside>

      <div className={classes.greeting}>
        {greeting ? (
          <>
            <h2>text:greetings from the server:</h2>
            <table>
              <tr>
                <td>text</td>
                <td>{greeting.text}</td>
              </tr>
              <tr>
                <td>time</td>
                <td>{new Date(greeting?.time).toISOString()}</td>
              </tr>
            </table>
          </>
        ) : (
          <>pending ...</>
        )}
      </div>
    </>
  );
};
export default Playground;
