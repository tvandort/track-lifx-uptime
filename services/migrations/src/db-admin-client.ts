import knex from "knex";
import config from "./knexfile";

console.log("abcdefg", config);
export default knex(config);
