import express, { Request, Express } from "express";
import knex from "knex";
import environment from "../environment";
import { serviceReady } from "./middleware";

export interface Dependencies {
  dbClient: knex;
}

class Api {
  express: Express;
  connected: boolean;
  private client: knex;

  constructor({ dbClient }: Dependencies) {
    const app = express();
    this.client = dbClient;
    app.use(serviceReady.bind(this));

    app.get("/version", async (_, response) => {
      const { name } = await this.client
        .select("name")
        .from("knex_migrations")
        .orderBy("migration_time", "desc")
        .first();
      const [version] = name.split("_");

      response.send(version);
    });

    app.listen(environment.API_PORT, () =>
      console.log(`Experiment listening on port ${environment.API_PORT}`)
    );

    this.connected = false;
    this.express = app;
  }
}

const setupApi = (dependencies: Dependencies) => {
  const api = new Api(dependencies);

  return api;
};

export { setupApi };
