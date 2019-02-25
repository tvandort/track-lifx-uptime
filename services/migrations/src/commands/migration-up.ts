import Client from "../client";

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
      const result = await client.query(
        `
          SELECT name
          FROM migrations
        `
      );
      console.log(result);
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
    console.log("Error bootstrapping migrations: ", error.message);
  } finally {
    await client.end();
  }
})();
