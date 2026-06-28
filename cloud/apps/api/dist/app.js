import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import { env } from "./config/env.js";
import { csrfProtection } from "./middlewares/csrf.js";
import { apiRouter } from "./routes/index.js";
import { errorHandler } from "./middlewares/error-handler.js";
export const app = express();
const isAllowedOrigin = (origin) => {
    if (!origin)
        return true;
    if (origin === env.APP_ORIGIN)
        return true;
    if (env.NODE_ENV === "development") {
        return /^http:\/\/localhost:\d+$/.test(origin);
    }
    return false;
};
app.use(cors({
    origin(origin, callback) {
        if (isAllowedOrigin(origin)) {
            callback(null, true);
            return;
        }
        callback(new Error("CORS origin denied"));
    },
    credentials: true
}));
app.use(helmet({
    crossOriginResourcePolicy: {
        policy: "cross-origin"
    }
}));
app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.json({ limit: "10mb" }));
app.use(rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 500
}));
app.use(csrfProtection);
app.get("/health", (_req, res) => {
    res.json({ status: "ok" });
});
app.use("/", apiRouter);
app.use(errorHandler);
//# sourceMappingURL=app.js.map