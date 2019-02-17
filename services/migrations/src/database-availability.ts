import environment from "./environment";
import waitOn from "wait-on";

export default async function databaseResponse() {
  try {
    await waitOn({
      resources: [
        `tcp:${environment.DATABASE_ADDRESS}:${environment.DATABASE_PORT}`
      ]
    });
  } catch (error) {
    console.log("Error waiting for database to start up: ", error);
    process.exit(1);
  }
}
