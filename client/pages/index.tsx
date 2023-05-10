import Link from "next/link";

const A = (props: { href: string }) => <a href={props.href}>{props.href}</a>;

export default function Home() {
  return (
    <>
      <h2>Welcome to the gotsrpc playground!</h2>
      <p>
        gotsrpc and gotsrpc-playground are proudly brought to you by{" "}
        <a href="https://www.bestbytes.com">bestbytes</a> through{" "}
        <a href="https://www.foomo.org">https://www.foomo.org</a>.
      </p>
      <h3>gotsrpc</h3>
      <p>
        github repo:
        <br />
        <A href="https://www.foomo.org/foomo/gotsrpc" />
      </p>
      <p>
        documentation:
        <br />
        <A href="https://www.foomo.org/docs/projects/gotsrpc" />
      </p>
      <h3>gotsrpc playground</h3>
      <p>
        github repo:
        <br />
        <A href="https://www.foomo.org/foomo/gotsrpc-playground" />
      </p>
      <p>
        playground documentation:
        <br />
        <A href="https://www.foomo.org/docs/projects/gotsrpc/playground" />
      </p>
    </>
  );
}
