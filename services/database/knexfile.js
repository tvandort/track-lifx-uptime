// @ts-check
var knex = require("knex");

/** @type {knex.Config} */
const config = {
  client: "pg",
  connection: {
    database: process.env.DATABASE,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    host: process.env.DB_ADDRESS,
    port: process.env.DB_PORT
  }
};

module.exports = config;
