import { NextFunction, Request, Response } from "express";

// ============ AsyncHandler function to wrap async route handlers and catch errors ================
function AsyncHandler(
  requestHandler: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<void | Response<void | any, Record<string, any>>>
) {
  return function (req: Request, res: Response, next: NextFunction) {
    Promise.resolve(requestHandler(req, res, next)).catch((err) => {
      next(err);
    });
  };
}

export { AsyncHandler };
