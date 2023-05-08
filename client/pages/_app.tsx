import styles from "@/styles/App.module.css";
import "@/styles/globals.css";
import Head from "next/head";

import type { AppProps } from "next/app";
import Link from "next/link";
import { TransportLog } from "@/components/TransportLog";

export default function App(props: AppProps) {
  const { Component, pageProps } = props;
  let currentPage = props.router.asPath.substring(1);
  if (currentPage === "") {
    currentPage = "/";
  }
  let currentLabel = "Home";
  return (
    <>
      <Head>
        <title>gotsrpc playground</title>
        <meta
          name="description"
          content="simple next js app with a gotsrpc server"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <nav>
          <h1>gotsrpc playground</h1>
          <ul>
            {[
              { page: "/", label: "Home" },
              { page: "hello-world", label: "Hello, World!" },
              { page: "wheel-of-fortune", label: "Wheel of Fortune" },
              { page: "ouch", label: "What could go wrong?" },
              { page: "todos", label: "Todos" },
              { page: "playground", label: "Your playground" },
            ].map((ne) => {
              if (currentPage === ne.page) {
                currentLabel = ne.label;
              }
              return (
                <li key={ne.page}>
                  {currentPage === ne.page ? (
                    <b>{ne.label}</b>
                  ) : (
                    <Link href={ne.page}>{ne.label}</Link>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>
        <h2>{currentLabel}</h2>
        <Component {...pageProps} />
        {["/", "hello-world"].indexOf(currentPage) === -1 && <TransportLog />}
      </main>
    </>
  );
}
