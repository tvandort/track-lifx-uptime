import knex from "knex";
import knexfile from "./knexfile";
import { ensureRequiredEnvironment } from "./environment";
import databaseResponse from "./database-availability";
import { setupApi } from "./api";

ensureRequiredEnvironment();

console.log(knexfile);
// const dbClient = knex(knexfile);
const api = setupApi();

(async () => {
  await databaseResponse(() => {
    console.log("Error waiting for database.");
    process.exit(1);
  });
  try {
    // await dbClient.migrate.latest();
  } catch (error) {
    console.log("Error in migration: ", error);
  }
  api.connected = true;
})();
