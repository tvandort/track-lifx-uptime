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

  const migrationTableExists = await doesMigrationTableExist(client);
  if (migrationTableExists) {
    console.log("Migration table exists.");
  } else {
    console.log("Creating migration table.");
  }

  await client.end();
})();
