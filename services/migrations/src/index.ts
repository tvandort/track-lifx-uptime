import knex from "knex";
import knexfile from "./knexfile";
import { ensureRequiredEnvironment } from "./environment";
import databaseResponse from "./database-availability";
import { Dependencies, setupApi } from "./api";

ensureRequiredEnvironment();

const dependencies: Dependencies = {
  dbClient: knex(knexfile)
};

const api = setupApi(dependencies);

(async () => {
  await databaseResponse();
  api.connected = true;
})();
