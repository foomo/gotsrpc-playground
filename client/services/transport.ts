// every project has special needs for their flavour of transport this is a
// naive vanilla implementation
const transport =
  (endpoint: string) =>
  async <T>(method: string, args: any = []) => {
    return new Promise<T>(async (resolve, reject) => {
      fetch(`${endpoint}/${encodeURIComponent(method)}`, {
        method: "POST",
        body: JSON.stringify(args),
      })
        .then((response) => {
          return response.json() as Promise<T>;
        })
        .then((val) => resolve(val))
        .catch((err) => reject(err));
    });
  };

// every generated gotsrpc client implements this interface
export interface ServiceConstructor<ST> extends Function {
  defaultEndpoint: string;
  prototype: ST;
  new (transport: <T>(method: string, data?: any[]) => Promise<T>): ST;
}

// this client for client construction
export const getClient = <T>(clientClass: ServiceConstructor<T>) => {
  return new clientClass(transport('http://localhost:8080'+clientClass.defaultEndpoint));
};
