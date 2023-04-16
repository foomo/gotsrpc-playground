import { SimpleForm } from "@/components/SimpleForm";
import { ServiceClient } from "@/services/generated/client-helloworld";
import { getClient } from "@/services/transport";
import { useState } from "react";
import classes from "@/styles/HelloWorld.module.css";
import { DocsAside } from "@/components/DocsAside";

const client = getClient(ServiceClient);

const HelloWorld = () => {
  const [greeting, setGreeting] = useState<string | null>(null);
  return (
    <>
      <DocsAside anchor="hello-world">
        <p>This example is as simple as it gets:</p>
        <ul>
          <li>there is just one rpc method to call</li>
          <li>no errors</li>
          <li>no types, just strings</li>
        </ul>
        <p>
          <a href="https://en.wikipedia.org/wiki/%22Hello,_World!%22_program">
            Hello, World! on Wikipedia
          </a>
        </p>
      </DocsAside>

      <p>Enter and submit your name, to be greeted from the server.</p>

      <SimpleForm
        onCreate={(name) =>
          client
            .hello(name)
            .then((greeting) => setGreeting(greeting))
            .catch((e) => console.error("an error has occurred", e))
        }
        placeholder={greeting ? "try another name" : "enter your name"}
      />

      {greeting !== null ? (
        <div className={classes.greeting}>
          Resulting greeting:
          <code>{greeting}</code>
        </div>
      ) : (
        <p>
          a greeting for the server will be displayed here - please enter and
          submit your name
        </p>
      )}
    </>
  );
};

export default HelloWorld;
