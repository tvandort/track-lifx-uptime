import * as knex from "knex";
import environment from "../environment";

const connection = {
  connection: {
    database: environment.DATABASE,
    user: environment.ADMIN_USER,
    password: environment.ADMIN_PASSWORD,
    host: environment.DATABASE_ADDRESS,
    port: environment.DATABASE_PORT
  } as knex.ConnectionConfig
};

export default connection;
