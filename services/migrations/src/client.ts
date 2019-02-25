import { Client as PgClient } from "pg";

import environment from "./environment";

export default class Client extends PgClient {
  constructor() {
    super({
      database: environment.DATABASE,
      host: environment.DATABASE_ADDRESS,
      port: environment.DATABASE_PORT,
      password: environment.POSTGRES_ADMIN_PASSWORD,
      user: environment.POSTGRES_ADMIN_USER
    });
  }
}
