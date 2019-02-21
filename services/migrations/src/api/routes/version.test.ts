// import version from "./version";
// import client from "../../db-admin-client";

// jest.mock("../../db-admin-client");

// describe("version route", () => {
//   it("sends version in response", async () => {
//     const versionNumber = "123_arbitrary text";
//     const fakeChain = {
//       from: jest.fn().mockReturnThis(),
//       orderBy: jest.fn().mockReturnThis(),
//       first: jest.fn().mockReturnValue({ name: versionNumber })
//     };
//     jest.spyOn(client, "select").mockReturnValueOnce(fakeChain as any);

//     const request = {};
//     const response = {
//       send: jest.fn()
//     };

//     await version(request as any, response as any);

//     expect(response.send).toBeCalledWith("123");
//   });
// });
