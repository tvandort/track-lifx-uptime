import Environment, { ensureRequiredEnvironment } from "./environment";

const envVars = [
  ["ADMIN_USER", "A_USER"],
  ["ADMIN_PASSWORD", "A_PASSWORD"],
  ["DATABASE", "A_DATABASE"],
  ["DATABASE_ADDRESS", "A_SERVER_ADDRESS"],
  ["DATABASE_PORT", "A_DATABASE_PORT"],
  ["API_PORT", "AN_API_PORT"]
];

describe("environment", () => {
  describe("complete", () => {
    beforeEach(() => {
      setupEnvironmentVariables();
    });

    it("has ADMIN_USER", () => {
      expect(Environment.ADMIN_USER).toBe("A_USER");
    });

    it("has ADMIN_PASSWORD", () => {
      expect(Environment.ADMIN_PASSWORD).toBe("A_PASSWORD");
    });

    it("has DATABASE", () => {
      expect(Environment.DATABASE).toBe("A_DATABASE");
    });

    it("has DATABASE_ADDRESS", () => {
      expect(Environment.DATABASE_ADDRESS).toBe("A_SERVER_ADDRESS");
    });

    it("has DATABASE_PORT", () => {
      expect(Environment.DATABASE_PORT).toBe("A_DATABASE_PORT");
    });

    it("has API_PORT", () => {
      expect(Environment.API_PORT).toBe("AN_API_PORT");
    });

    it("not to throw when environment is OK", () => {
      expect(() => ensureRequiredEnvironment()).not.toThrow();
    });

    afterEach(() => {
      cleanEnvironmentVariables();
    });
  });

  describe("incomplete", () => {
    it("fails on missing variable", () => {
      expect(() => ensureRequiredEnvironment()).toThrowErrorMatchingSnapshot();
    });
  });
});

const setupEnvironmentVariables = () =>
  envVars.forEach(([key, value]) => {
    process.env[key] = value;
  });

const cleanEnvironmentVariables = () =>
  envVars.forEach(([key]) => {
    delete process.env[key];
  });
