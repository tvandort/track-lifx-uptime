import fs from "fs";
import path from "path";
import Client from "../client";
import SQL from "sql-template-strings";
import { QueryResult } from "pg";

interface MigrationNameQueryResult extends QueryResult {
  rows: [{ name: string }];
}

const doesMigrationTableExist = async (client: Client) => {
  interface ExistsQuery {
    exists: boolean;
  }

  const migrationTableExists = await client.query(
    `
      SELECT EXISTS (
        SELECT 1
        FROM information_schema.tables
        WHERE table_schema = 'public'
          AND TABLE_NAME = 'migrations'
      )
    `
  );

  return (
    migrationTableExists.rowCount > 0 &&
    (migrationTableExists.rows[0] as ExistsQuery).exists
  );
};

(async () => {
  const client = new Client();
  try {
    await client.connect();
  } catch (error) {
    console.log("Couldn't connect", error.message);
    return;
  }

  try {
    const migrationTableExists = await doesMigrationTableExist(client);
    if (migrationTableExists) {
      console.log("Migration table exists.");
      const migrations = ((await client.query(
        `
          SELECT name
          FROM migrations
        `
      )) as MigrationNameQueryResult).rows.map(({ name }) => name);

      const migrationFiles = fs.readdirSync("./src/migrations");
      const upRegex = /.up.sql$/;
      const upMigrationFiles = migrationFiles
        .filter(file => upRegex.test(file))
        .map(migration => ({
          fileName: migration,
          migrationName: migration.split(".up.sql")[0]
        }));

      const upMigrationsThatNeedToRun = upMigrationFiles.filter(
        migration => !migrations.includes(migration.migrationName)
      );

      for (let index = 0; index < upMigrationsThatNeedToRun.length; index++) {
        const { fileName, migrationName } = upMigrationsThatNeedToRun[index];
        const migrationText = fs.readFileSync(
          path.join("./src/migrations", fileName),
          "utf8"
        );
        await client.query("BEGIN TRANSACTION");
        try {
          await client.query(
            SQL`
              INSERT INTO migrations (name)
                VALUES
              (${migrationName})
            `
          );
          await client.query(migrationText);
          await client.query(
            SQL`
              UPDATE migrations
              SET ended_on=now()
              WHERE name=${migrationName}
            `
          );
          await client.query("COMMIT");
        } catch (error) {
          console.log("error rolling back");
          await client.query("ROLLBACK");
          throw error;
        }
      }
    } else {
      console.log("Creating migration table.");
      await client.query(
        `
          CREATE TABLE migrations (
            id SERIAL PRIMARY KEY,
            name VARCHAR,
            began_on TIMESTAMPTZ NOT NULL DEFAULT now(),
            ended_on TIMESTAMPTZ
          )
        `
      );
      console.log("Migration table created.");
    }
  } catch (error) {
    console.log("Error running migrations: ", error.message);
  } finally {
    await client.end();
  }
})();
