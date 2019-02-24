import fs from "fs"

const reportFileCreationError = (error: Error) => {
  if (error) {
    console.log(error);
  }
};

const writeOptions = {
  flag: "w"
};

const getTimestampGivenDate = (targetDate: Date) => {
  const year = targetDate.getFullYear();
  const month = targetDate.getUTCMonth() + 1;
  const day = targetDate.getUTCDate();
  const milliseconds = targetDate.getUTCMilliseconds();
  return `${year}${month}${day}${milliseconds}`;
};

const writeDownMigration = (name: string) => {
  fs.writeFile(
    `./src/migrations/${name}.down.sql`,
    "",
    writeOptions,
    reportFileCreationError
  );
};

const writeUpMigration = (name: string) => {
  fs.writeFile(
    `./src/migrations/${name}.up.sql`,
    "",
    writeOptions,
    reportFileCreationError
  );
};

const createMigrations = (name: string) => {
  const timestamp = getTimestampGivenDate(new Date());
  const fileName = `${timestamp}_${name}`;
  writeUpMigration(fileName);
  writeDownMigration(fileName);
};

const [, , name] = process.argv;
if (name) {
  createMigrations(name);
} else {
  console.log("Please provide a name for this migration.");
  process.exit(1);
}
