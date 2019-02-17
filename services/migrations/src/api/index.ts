import express, { Request, Express } from "express";
import knex from "knex";
import environment from "../environment";

export interface Dependencies {
  dbClient: knex;
}

class Api {
  app: Express;
  connected: boolean;

  constructor({ dbClient: client }: Dependencies) {
    this.connected = false;
    this.app = express();

    this.app.use((request: Request, response, next) => {
      if (this.connected) {
        request.client = client;
        next();
      } else {
        response.status(503).send("Service is starting");
        response.end();
      }
    });

    this.app.get("/version", (_, response) => {
      response.send("Example");
    });

    this.app.listen(environment.API_PORT, () =>
      console.log(`Experiment listening on port ${environment.API_PORT}`)
    );
  }
}

const setupApi = (dependencies: Dependencies) => {
  const api = new Api(dependencies);

  return api;
};

export { setupApi };
