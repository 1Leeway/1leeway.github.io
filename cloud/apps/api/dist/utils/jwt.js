import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
export const signSessionToken = (payload) => {
    return jwt.sign(payload, env.JWT_SECRET, {
        expiresIn: env.JWT_EXPIRES_IN
    });
};
export const verifySessionToken = (token) => {
    return jwt.verify(token, env.JWT_SECRET);
};
//# sourceMappingURL=jwt.js.map