import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

interface SessionPayload {
  sub: string;
  sid: string;
}

export const signSessionToken = (payload: SessionPayload) => {
  return jwt.sign(payload, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRES_IN as jwt.SignOptions["expiresIn"]
  });
};

export const verifySessionToken = (token: string): SessionPayload => {
  return jwt.verify(token, env.JWT_SECRET) as SessionPayload;
};
