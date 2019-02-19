import * as knex from "knex";
import environment from "../environment";
import connection from "./connection";

const config = {
  client: "pg",
  migrations: {
    directory: "build/migrations"
  }
};

export default { config };
