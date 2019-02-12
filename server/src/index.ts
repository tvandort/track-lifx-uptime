import LifxLan from "node-lifx-lan";
console.log("Booting.");

// setInterval(() => {
//   console.log("Listening");
// }, 1000);

const discover = async () => {
  const list = await LifxLan.discover();
  console.log(list);
  setTimeout(discover, 1000);
};

discover();

// LifxLan.discover().then(list => console.log(list));
