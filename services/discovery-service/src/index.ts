import { Client } from "node-lifx";
import Events from "./events";

console.log("Launching discovery service");

const client = new Client();

client.on(Events.LightNew, light => {
  console.log("New Light: ", light);
});

client.on(Events.LightOffline, light => {
  console.log("Light went offline: ", light);
});

client.on(Events.LightOnline, light => {
  console.log("Light came back online: ", light);
});

client.init({
  broadcast: "192.168.1.255"
});
