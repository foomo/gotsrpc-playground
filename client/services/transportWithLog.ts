import { useStore } from "zustand";
import { createStore } from "zustand/vanilla";
import { ServiceConstructor } from "./transport";

export type LogEntry = {
  requestID: string;
  expanded?: boolean;
  start: Date;
  end?: Date;
  request?: { url: string; args: Array<any> };
  response?: { values: Array<any> | null };
  transportError?: string;
};

export type Log = Array<LogEntry>;
export type RequestLogger = (
  requestID: string,
  url: string,
  args: Array<any>
) => void;
export type ResponseLogger = (
  requestID: string,
  vals: Array<any> | null,
  transportError?: string
) => void;

interface TransportLogState {
  log: Log;
  logRequest: RequestLogger;
  logResponse: ResponseLogger;
  toggle: (requestID: string) => void;
  clear: () => void;
  numRunningCalls: number;
}

const transportLogStore = createStore<TransportLogState>()((set) => ({
  log: [],
  numRunningCalls: 0,
  clear: () => {
    set({ log: [] });
  },
  toggle: (requestID: string) => {
    set((state) => {
      const newLog = [...state.log];
      for (let i = 0; i < newLog.length; i++) {
        const current = newLog[i];
        if (current.requestID == requestID) {
          newLog[i] = {
            ...current,
            expanded: !current.expanded,
          };
        }
      }
      return { log: newLog };
    });
  },
  logRequest: (requestID: string, url: string, args: Array<any>) =>
    set((state) => {
      const newLog = [
        {
          requestID,
          start: new Date(),
          expanded: false,
          request: {
            args,
            url,
          },
        },
        ...state.log,
      ];
      return { log: newLog, numRunningCalls: state.numRunningCalls + 1 };
    }),
  logResponse: (
    requestID: string,
    values: Array<any> | null,
    transportError?: string
  ) =>
    set((state) => {
      const newLog: Array<LogEntry> = [...state.log];
      for (let i = 0; i < newLog.length; i++) {
        const l = newLog[i];
        if (l.requestID == requestID) {
          l.end = new Date();
          l.response = {
            values,
          };
          l.transportError = transportError;
          break;
        }
      }
      return { log: newLog, numRunningCalls: state.numRunningCalls - 1 };
    }),
}));

export const useTransportLogStore = (
  selector: (state: TransportLogState) => any
) => useStore(transportLogStore, selector);

let i = 0;

const transportWithLog =
  (endpoint: string) =>
  async <T>(method: string, args: any = []) => {
    return new Promise<T>(async (resolve, reject) => {
      i++;
      const requestID = "req-" + i;
      const url = `${endpoint}/${encodeURIComponent(method)}`;
      transportLogStore.getState().logRequest(requestID, url, args);
      fetch(url, {
        method: "POST",
        body: JSON.stringify(args),
      })
        .then((response) => {
          return response.json() as Promise<T>;
        })
        .then((val) => {
          transportLogStore.getState().logResponse(requestID, [val]);
          resolve(val);
        })
        .catch((err) => {
          transportLogStore.getState().logResponse(requestID, null, err + "");
          reject(err);
        });
    });
  };

export const getClientWithTransportLog = <T>(
  clientClass: ServiceConstructor<T>
) => {
  return new clientClass(transportWithLog('http://localhost:8080'+clientClass.defaultEndpoint));
};
