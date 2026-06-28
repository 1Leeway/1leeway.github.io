import { Router } from "express";
import { authRouter } from "./auth.routes.js";
import { filesRouter } from "./files.routes.js";
import { foldersRouter } from "./folders.routes.js";
import { settingsRouter } from "./settings.routes.js";
import { shareRouter } from "./share.routes.js";
import { uploadRouter } from "./upload.routes.js";
import { userRouter } from "./user.routes.js";

export const apiRouter = Router();

apiRouter.use("/auth", authRouter);
apiRouter.use("/files", filesRouter);
apiRouter.use("/upload", uploadRouter);
apiRouter.use("/folders", foldersRouter);
apiRouter.use("/share", shareRouter);
apiRouter.use("/user", userRouter);
apiRouter.use("/settings", settingsRouter);
