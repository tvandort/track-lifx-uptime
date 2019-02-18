import express, { Express } from "express";
import knex from "knex";
import environment from "../environment";
import { serviceReady } from "./middleware";
import version from "./routes/version";

export interface Dependencies {
  dbClient: knex;
}

class Api {
  express: Express;
  connected: boolean;

  constructor() {
    const app = express();

    app.use(serviceReady.bind(this));
    app.get("/version", version);

    app.listen(environment.API_PORT, () =>
      console.log(`Experiment listening on port ${environment.API_PORT}`)
    );

    this.connected = false;
    this.express = app;
  }
}

const setupApi = () => {
  const api = new Api();

  return api;
};

export { setupApi };
