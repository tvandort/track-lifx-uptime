import waitOn from "wait-on";
import knex from "knex";
import config from "./knexfile";
import express from "express";
import SQL from "sql-template-strings";

const app = express();
const port = process.env.DB_API_PORT;
const databasePort = `tcp:${process.env.DB_ADDRESS}:${process.env.DB_PORT}`;

let client: knex;

app.get("/version", (_, response) => {
  if (client) {
    response.send();
  } else {
    response.status(503);
  }
});

app.listen(port, () => console.log(`Experiment listening on port ${port}`));

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
    client = knex(config);
    client.migrate.latest();
  } catch (error) {
    console.log("Error in migration: ", error);
  }
})();
