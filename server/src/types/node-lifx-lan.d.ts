declare module "node-lifx-lan" {
  interface LifxLanDevice {}

  interface DiscoveryParams {
    wait?: number;
  }

  interface LifxLan {
    discover(params?: DiscoveryParams): Promise<LifxLanDevice[]>;
  }

  let LifxLan: LifxLan;
  export = LifxLan;
}
