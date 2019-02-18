import knex from "knex";
import knexfile from "./knexfile";
import { ensureRequiredEnvironment } from "./environment";
import databaseResponse from "./database-availability";
import { Dependencies, setupApi } from "./api";

ensureRequiredEnvironment();

const dbClient = knex(knexfile);
const dependencies: Dependencies = {
  dbClient
};

const api = setupApi(dependencies);

(async () => {
  await databaseResponse(() => {
    console.log("Error waiting for database.");
    process.exit(1);
  });
  try {
    await dbClient.migrate.latest();
  } catch (error) {
    console.log("Error in migration: ", error);
  }
  api.connected = true;
})();
