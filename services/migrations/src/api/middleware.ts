import { NextFunction, Request, Response } from "express";

function serviceReady(
  this: { connected: boolean },
  _: Request,
  response: Response,
  next: NextFunction
) {
  if (this.connected) {
    next();
  } else {
    response.status(503).send("Service is starting");
    response.end();
  }
}

export { serviceReady };
