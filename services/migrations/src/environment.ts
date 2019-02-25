const envVars = [
  {
    key: "POSTGRES_ADMIN_USER",
    value: "A_USER",
    warn: "Postgres connection requires admin account."
  },
  {
    key: "POSTGRES_ADMIN_PASSWORD",
    value: "A_PASSWORD",
    warn: "Postgres connection requires admin password."
  },
  {
    key: "DATABASE",
    value: "A_DATABASE",
    warn: "Postgres connection requires database."
  },
  {
    key: "DATABASE_ADDRESS",
    value: "A_SERVER_ADDRESS",
    warn: "Postgres connection requires address."
  },
  {
    key: "DATABASE_PORT",
    value: "A_DATABASE_PORT",
    warn: "Postgres connection requires port."
  },
  {
    key: "API_PORT",
    value: "AN_API_PORT",
    warn: "API requires a port."
  }
];

export default class Environment {
  static get POSTGRES_ADMIN_USER(): string {
    return process.env["POSTGRES_ADMIN_USER"]!;
  }

  static get POSTGRES_ADMIN_PASSWORD(): string {
    return process.env["POSTGRES_ADMIN_PASSWORD"]!;
  }

  static get DATABASE(): string {
    return process.env["DATABASE"]!;
  }

  static get DATABASE_ADDRESS(): string {
    return process.env["DATABASE_ADDRESS"]!;
  }

  static get DATABASE_PORT(): number {
    return parseInt(process.env["DATABASE_PORT"]!, 10);
  }

  static get API_PORT(): number {
    return parseInt(process.env["API_PORT"]!, 10);
  }
}

export const ensureRequiredEnvironment = () => {
  const initialWarnings: string[] = [];
  const missingVariableWarnings = envVars.reduce(
    (warnings, environmentVariable) => {
      const variable = process.env[environmentVariable.key];
      if (variable) {
        return warnings;
      }
      return warnings.concat(
        `Missing "${environmentVariable.key}". ${environmentVariable.warn}`
      );
    },
    initialWarnings
  );

  if (missingVariableWarnings.length > 0) {
    const warningMessage = missingVariableWarnings
      .map(warning => `\t • ${warning}`)
      .join("\n");
    throw new Error(`
Incomplete environment setup:

${warningMessage}
    `);
  }
};
