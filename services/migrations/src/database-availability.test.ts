import environment from "./environment";
import * as waitOn from "wait-on";
import databaseResponse from "./database-availability";

const mockWaitOn = jest.fn(async () => {});
jest.mock("wait-on", mockWaitOn);
jest.mock("./environment", () => ({
  DATABASE_ADDRESS: "TEST_ADDRESS",
  DATABASE_PORT: "5555"
}));

describe("database availability", () => {
  it("calls waitOn with params", async () => {
    mockWaitOn.mockImplementationOnce(async () => {});
    const result = await databaseResponse(() => {});
    expect(waitOn.default).toHaveBeenCalledTimes(1);
    expect(waitOn.default).toHaveBeenCalledWith({
      resources: [
        `tcp:${environment.DATABASE_ADDRESS}:${environment.DATABASE_PORT}`
      ]
    });

    return result;
  });

  it("error message on failure calls callback", async () => {
    mockWaitOn.mockImplementationOnce(async () => {
      throw new Error("WHAT");
    });

    const errorCallback = jest.fn();
    const result = await databaseResponse(errorCallback);

    return result;
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });
});
