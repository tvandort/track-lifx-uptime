import Environment, { ensureRequiredEnvironment } from "./environment";

const envVars = [
  ["POSTGRES_ADMIN_USER", "A_USER"],
  ["POSTGRES_ADMIN_PASSWORD", "A_PASSWORD"],
  ["DATABASE", "A_DATABASE"],
  ["DATABASE_ADDRESS", "A_SERVER_ADDRESS"],
  ["DATABASE_PORT", "456"],
  ["API_PORT", "123"]
];

describe("environment", () => {
  describe("complete", () => {
    beforeEach(() => {
      setupEnvironmentVariables();
    });

    it("has POSTGRES_ADMIN_USER", () => {
      expect(Environment.POSTGRES_ADMIN_USER).toBe("A_USER");
    });

    it("has POSTGRES_ADMIN_PASSWORD", () => {
      expect(Environment.POSTGRES_ADMIN_PASSWORD).toBe("A_PASSWORD");
    });

    it("has DATABASE", () => {
      expect(Environment.DATABASE).toBe("A_DATABASE");
    });

    it("has DATABASE_ADDRESS", () => {
      expect(Environment.DATABASE_ADDRESS).toBe("A_SERVER_ADDRESS");
    });

    it("has DATABASE_PORT", () => {
      expect(Environment.DATABASE_PORT).toBe(456);
    });

    it("has API_PORT", () => {
      expect(Environment.API_PORT).toBe(123);
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
