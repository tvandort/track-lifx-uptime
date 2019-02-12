// import LifxLan from "node-lifx-lan";
// console.log("Booting.");

// // setInterval(() => {
// //   console.log("Listening");
// // }, 1000);

// const discover = async () => {
//   const list = await LifxLan.discover();
//   console.log(list);
//   setTimeout(discover, 1000);
// };

// discover();

// // LifxLan.discover().then(list => console.log(list));

import { Client } from "node-lifx";

const client = new Client();

client.on("light-new", light => {
  console.log(light);
});

client.init({
  debug: true,
  broadcast: "192.168.1.255"
});
