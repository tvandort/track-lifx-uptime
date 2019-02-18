import { Request, Response } from "express";
import client from "../../db-admin-client";

const version = async (_: Request, response: Response) => {
  const { name } = await client
    .select("name")
    .from("knex_migrations")
    .orderBy("migration_time", "desc")
    .first();

  const [version] = name.split("_");

  response.send(version);
};

export default version;
