import * as knex from "knex";
import environment from "./environment";

const config: knex.Config = {
  client: "pg",
  connection: {
    database: environment.DATABASE,
    user: environment.ADMIN_USER,
    password: environment.ADMIN_PASSWORD,
    host: environment.DATABASE_ADDRESS,
    port: environment.DATABASE_PORT
  } as knex.ConnectionConfig,
  migrations: {
    directory: "build/migrations"
  }
};

export default config;
