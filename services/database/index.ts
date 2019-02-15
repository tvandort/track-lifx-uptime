import waitOn from "wait-on";
import knex from "knex";
import config from "./knexfile";

const databasePort = `tcp:${process.env.DB_ADDRESS}:${process.env.DB_PORT}`;

(async () => {
  try {
    const resources = [databasePort];
    await waitOn({
      resources
    });
  } catch (error) {
    console.log("Error waiting for database to start up: ", error);
    process.exit(1);
  }

  try {
    const client = knex(config);
    client.migrate.latest();
    process.exit(0);
  } catch (error) {
    console.log("Error in migration: ", error);
    process.exit(1);
  }
})();
