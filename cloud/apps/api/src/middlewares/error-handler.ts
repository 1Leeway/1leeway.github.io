import type { NextFunction, Request, Response } from "express";

export const errorHandler = (
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (err instanceof Error) {
    if (err.message.includes("invalid csrf token")) {
      return res.status(403).json({ message: "CSRF token invalid" });
    }
    return res.status(400).json({ message: err.message });
  }

  return res.status(500).json({ message: "Unexpected server error" });
};
