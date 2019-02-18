import environment from "./environment";
import * as waitOn from "wait-on";
import databaseResponse from "./database-availability";

jest.mock("wait-on");
jest.mock("./environment", () => ({
  DATABASE_ADDRESS: "TEST_ADDRESS",
  DATABASE_PORT: "5555"
}));

describe("database availability", () => {
  it("calls waitOn with params", async () => {
    (waitOn as any).mockImplementationOnce(async () => {});
    await databaseResponse(() => {});
    expect(waitOn).toHaveBeenCalledTimes(1);
    expect(waitOn).toHaveBeenCalledWith({
      resources: [
        `tcp:${environment.DATABASE_ADDRESS}:${environment.DATABASE_PORT}`
      ]
    });
  });

  it("error message on failure calls callback", async () => {
    (waitOn as any).mockImplementationOnce(async () => {
      throw new Error();
    });

    const errorCallback = jest.fn();
    await databaseResponse(errorCallback);
    expect(errorCallback).toHaveBeenCalled();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });
});
