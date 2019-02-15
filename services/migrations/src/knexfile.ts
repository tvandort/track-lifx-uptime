import * as knex from "knex";

const config: knex.Config = {
  client: "pg",
  connection: {
    database: process.env.DATABASE,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    host: process.env.DB_ADDRESS,
    port: process.env.DB_PORT
  } as knex.ConnectionConfig,
  migrations: {
    directory: "build/migrations"
  }
};

export default config;
