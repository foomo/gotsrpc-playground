import Link from "next/link";

const A = (props: { href: string }) => <a href={props.href}>{props.href}</a>;

export default function Home() {
  return (
    <>
      <h2>Welcome to the gotsrpc playground!</h2>
      <p>
        gotsrpc{" "}
        <a href="https://github.com/foomo/gotsrpc">
          https://github.com/foomo/gotsrpc
        </a>{" "}
        is a <A href="https://www.foomo.org" /> project proudly brought to you
        by the <A href="https://www.bestbytes.com" /> team.
      </p>
      <p>
        This playground is referenced and documented here{" "}
        <A href="https://www.foomo.org/docs/projects/gotsrpc" />.
      </p>
    </>
  );
}
