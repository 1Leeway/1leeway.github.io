import { Router } from "express";
import { prisma } from "../config/prisma.js";
import { requireAuth } from "../middlewares/auth.js";
export const settingsRouter = Router();
settingsRouter.use(requireAuth);
settingsRouter.get("/", async (req, res) => {
    const files = await prisma.file.findMany({
        where: { ownerId: req.user.id, isDeleted: false },
        select: { sizeBytes: true }
    });
    const usedBytes = files.reduce((total, file) => total + Number(file.sizeBytes), 0);
    res.json({
        settings: {
            theme: req.user.theme,
            usedBytes
        }
    });
});
//# sourceMappingURL=settings.routes.js.map