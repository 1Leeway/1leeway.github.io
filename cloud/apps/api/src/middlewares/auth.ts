import type { NextFunction, Request, Response } from "express";
import { prisma } from "../config/prisma.js";
import { verifySessionToken } from "../utils/jwt.js";

const SESSION_COOKIE = "cloud_session";

export const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies[SESSION_COOKIE];
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const payload = verifySessionToken(token);
    const session = await prisma.session.findUnique({
      where: { token: payload.sid },
      include: { user: true }
    });

    if (!session || session.expiresAt < new Date()) {
      return res.status(401).json({ message: "Session expired" });
    }

    req.user = session.user;
    req.sessionToken = session.token;
    next();
  } catch {
    return res.status(401).json({ message: "Invalid session" });
  }
};
