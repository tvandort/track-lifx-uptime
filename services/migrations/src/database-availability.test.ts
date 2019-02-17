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
    jest
      .spyOn(waitOn, "default")
      .mockImplementationOnce(() => Promise.resolve());

    await databaseResponse();
    console.log("where am i");

    expect(waitOn.default).toHaveBeenCalledTimes(1);
    expect(waitOn.default).toHaveBeenCalledWith({
      resources: [
        `tcp:${environment.DATABASE_ADDRESS}:${environment.DATABASE_PORT}`
      ]
    });
  });

  it("exists process with error message on failure", async () => {
    jest
      .spyOn(waitOn, "default")
      .mockImplementationOnce(() => Promise.reject("Test error message."));
    jest.spyOn(console, "log").mockImplementationOnce(() => {});

    // @ts-ignore // Can't create an empty stub that returns never.
    jest.spyOn(process, "exit").mockImplementationOnce(() => {});

    await databaseResponse();

    expect(console.log).toBeCalledWith(
      "Error waiting for database to start up: ",
      "Test error message."
    );
    expect(process.exit).toHaveBeenCalledWith(1);
  });
});
