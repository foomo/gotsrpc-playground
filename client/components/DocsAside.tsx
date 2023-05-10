export const DocsAside = (
  props: React.PropsWithChildren<{ examplePage?: string }>
) => {
  return (
    <aside>
      {props.children}
      <div>
        {props.examplePage && (
          <a
            href={
              "https://www.foomo.org/docs/projects/gotsrpc/playground/" +
              props.examplePage
            }
            style={{ textDecoration: "none", fontSize: "2rem" }}
            title="documentation"
          >
            📖
          </a>
        )}
      </div>
    </aside>
  );
};
