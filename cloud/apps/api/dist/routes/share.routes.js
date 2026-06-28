import crypto from "node:crypto";
import path from "node:path";
import fs from "node:fs/promises";
import { Router } from "express";
import { z } from "zod";
import { prisma } from "../config/prisma.js";
import { env } from "../config/env.js";
import { requireAuth } from "../middlewares/auth.js";
export const shareRouter = Router();
const createSchema = z.object({
    fileId: z.string(),
    readOnly: z.boolean().default(true),
    allowDownload: z.boolean().default(true),
    expiresAt: z.string().datetime().optional(),
    password: z.string().min(6).optional(),
    maxDownloads: z.number().int().positive().optional()
});
const hashValue = (value) => {
    return crypto.createHmac("sha256", env.SHARE_TOKEN_SECRET).update(value).digest("hex");
};
shareRouter.post("/", requireAuth, async (req, res, next) => {
    try {
        const payload = createSchema.parse(req.body);
        const file = await prisma.file.findFirst({
            where: {
                id: payload.fileId,
                ownerId: req.user.id,
                isDeleted: false
            }
        });
        if (!file) {
            return res.status(404).json({ message: "File not found" });
        }
        const token = crypto.randomBytes(12).toString("hex");
        const shareLink = await prisma.shareLink.create({
            data: {
                token,
                ownerId: req.user.id,
                fileId: file.id,
                readOnly: payload.readOnly,
                allowDownload: payload.allowDownload,
                expiresAt: payload.expiresAt ? new Date(payload.expiresAt) : null,
                passwordHash: payload.password ? hashValue(payload.password) : null,
                maxDownloads: payload.maxDownloads
            }
        });
        res.status(201).json({
            shareLink,
            publicUrl: `${env.APP_ORIGIN}/share/${shareLink.token}`
        });
    }
    catch (error) {
        next(error);
    }
});
shareRouter.get("/:token", async (req, res, next) => {
    try {
        const share = await prisma.shareLink.findUnique({
            where: { token: req.params.token },
            include: { file: true }
        });
        if (!share) {
            return res.status(404).json({ message: "Share link not found" });
        }
        if (share.expiresAt && share.expiresAt < new Date()) {
            return res.status(410).json({ message: "Share link expired" });
        }
        if (share.maxDownloads && share.downloadCount >= share.maxDownloads) {
            return res.status(410).json({ message: "Max downloads reached" });
        }
        if (share.passwordHash) {
            const password = req.query.password;
            if (typeof password !== "string" || hashValue(password) !== share.passwordHash) {
                return res.status(401).json({ message: "Password required" });
            }
        }
        const absolutePath = path.resolve("uploads", share.file.path);
        if (share.allowDownload && req.query.download === "1") {
            await prisma.shareLink.update({
                where: { id: share.id },
                data: { downloadCount: { increment: 1 } }
            });
            return res.download(absolutePath, share.file.originalName);
        }
        const stat = await fs.stat(absolutePath);
        res.json({
            file: {
                id: share.file.id,
                name: share.file.originalName,
                mimeType: share.file.mimeType,
                sizeBytes: stat.size,
                previewUrl: `/share/${share.token}?download=1`
            },
            options: {
                readOnly: share.readOnly,
                allowDownload: share.allowDownload,
                expiresAt: share.expiresAt,
                maxDownloads: share.maxDownloads,
                downloadCount: share.downloadCount
            }
        });
    }
    catch (error) {
        next(error);
    }
});
//# sourceMappingURL=share.routes.js.map