import csurf from "csurf";
import { env } from "../config/env.js";

const isProd = env.NODE_ENV === "production";

export const csrfProtection = csurf({
  cookie: {
    key: "cloud_csrf",
    httpOnly: true,
    // GitHub Pages frontend is cross-site with API in production.
    sameSite: isProd ? "none" : "lax",
    secure: isProd ? true : env.COOKIE_SECURE
  }
});
