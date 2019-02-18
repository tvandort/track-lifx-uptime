import { Request, Response } from "express";
import { serviceReady } from "./middleware";

describe("middlewares", () => {
  describe(serviceReady, () => {
    it("responds with 503 and service starting", () => {
      const api = {
        connected: false,
        serviceReady
      };
      const request = {};
      const response = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn().mockReturnThis(),
        end: jest.fn().mockReturnThis()
      };
      const next = {};

      api.serviceReady(request as Request, response as any, next as any);

      expect(response.status).toBeCalledWith(503);
      expect(response.send).toBeCalledWith("Service is starting");
      expect(response.end).toBeCalled();
    });

    it("calls next when service is connected", () => {
      const api = { connected: true, serviceReady };
      const request = {};
      const response = {};
      const next = jest.fn();

      api.serviceReady(request as Request, response as any, next as any);

      expect(next).toBeCalled();
    });
  });
});
