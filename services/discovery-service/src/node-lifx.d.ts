declare module "node-lifx" {
  interface InitializationOptions {
    debug?: boolean;
    broadcast?: string;
  }

  type Events = "light-new" | "light-offline" | "light-online";

  class Client {
    init: (options?: InitializationOptions) => void;
    on: (event: Events, callback: (light: {}) => void) => void;
  }

  export { Client, InitializationOptions };
}
