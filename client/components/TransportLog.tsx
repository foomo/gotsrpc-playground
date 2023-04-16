import { LogEntry, useTransportLogStore } from "@/services/transportWithLog";
import classes from "@/styles/Components.module.css";
import { JsonViewer } from "@textea/json-viewer";
import { differenceInMilliseconds, format } from "date-fns";
import React, { useState } from "react";

const f = (d: Date | undefined) => {
  if (!d) {
    return "-";
  }
  return format(d, "HH:mm:ss.SSS");
};

export const TransportLog = () => {
  const [expanded, setExapanded] = useState(false);
  const log = useTransportLogStore((state) => state.log);
  const clear = useTransportLogStore((state) => state.clear);
  const toggle = useTransportLogStore((state) => state.toggle);
  return (
    <>
      <div style={{ height: expanded ? "auto" : "30vh" }}></div>
      <div
        className={classes.transportLog}
        style={{ height: expanded ? "100%" : "30vh" }}
      >
        <div className={classes.transportLogHeader}>
          gotsrpc transport log{" "}
          <button
            onClick={(e) => {
              clear();
            }}
          >
            clear 🚫
          </button>
          &nbsp;
          <button
            onClick={(e) => {
              setExapanded(!expanded);
            }}
          >
            {expanded ? "collapse ⬇️" : "expand ⬆️"}
          </button>
        </div>
        <div className={classes.transportLogTableWrapper}>
          <table className={classes.transportLogTable}>
            <tbody>
              {log.map((l: LogEntry, index: number) => (
                <React.Fragment key={l.requestID}>
                  <tr
                    onClick={(e) => {
                      toggle(l.requestID);
                    }}
                  >
                    <td
                      colSpan={2}
                      className={
                        index % 2 === 0
                          ? classes.transportLogTableHeaderRowEven
                          : classes.transportLogTableHeaderRowOdd
                      }
                    >
                      <div
                        className={classes.transportLogTableHeaderRowContent}
                      >
                        <span>
                          {f(l.start)} {l.request?.url}
                        </span>
                        <span>
                          <code>
                            {l.transportError &&
                              "transport error: " + l.transportError + " "}
                          </code>
                          {l.end &&
                            differenceInMilliseconds(l.end, l.start!) +
                              "ms"}{" "}
                          {!l.end && "pending"}{" "}
                        </span>
                      </div>
                    </td>
                  </tr>
                  {l.expanded && (
                    <tr>
                      <td>
                        request {f(l.start)}
                        <br />
                        <br />
                        <JsonViewer rootName={false} value={l.request?.args} />
                      </td>
                      <td>
                        response {f(l.end)}
                        <br />
                        <br />
                        <JsonViewer
                          rootName={false}
                          value={l.response?.values}
                        />
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
