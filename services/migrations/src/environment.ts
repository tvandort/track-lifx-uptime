const envVars = [
  {
    key: "ADMIN_USER",
    value: "A_USER",
    warn: "Postgres connection requires admin account."
  },
  {
    key: "ADMIN_PASSWORD",
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
  static get ADMIN_USER(): string {
    return process.env["ADMIN_USER"]!;
  }

  static get ADMIN_PASSWORD(): string {
    return process.env["ADMIN_PASSWORD"]!;
  }

  static get DATABASE(): string {
    return process.env["DATABASE"]!;
  }

  static get DATABASE_ADDRESS(): string {
    return process.env["DATABASE_ADDRESS"]!;
  }

  static get DATABASE_PORT(): string {
    return process.env["DATABASE_PORT"]!;
  }

  static get API_PORT(): string {
    return process.env["API_PORT"]!;
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
