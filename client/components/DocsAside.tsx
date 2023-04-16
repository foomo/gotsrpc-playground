export const DocsAside = (
  props: React.PropsWithChildren<{ anchor?: string }>
) => {
  return (
    <aside>
      {props.children}
      <div>
        {props.anchor && (
          <a
            href={"https://www.foomo.org/docs/projects/gotsrpc#" + props.anchor}
          >
            docs
          </a>
        )}
      </div>
    </aside>
  );
};
