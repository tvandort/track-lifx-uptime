import * as knex from "knex";
import connection from "./connection";
import knexconfig from "./knex-config";

const config: knex.Config = {
  ...knexconfig,
  ...connection
};

export default config;
