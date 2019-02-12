declare module "node-lifx" {
  class Client {
    init(options?: {
      address?: string;
      broadcast?: string;
      debug?: boolean;
    }): void;

    on: (event: "light-new", cb: (light: any) => void) => void;
  }
  export { Client };
}
