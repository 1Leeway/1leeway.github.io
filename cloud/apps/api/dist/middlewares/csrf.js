import csurf from "csurf";
import { env } from "../config/env.js";
export const csrfProtection = csurf({
    cookie: {
        key: "cloud_csrf",
        httpOnly: true,
        sameSite: "lax",
        secure: env.COOKIE_SECURE
    }
});
//# sourceMappingURL=csrf.js.map