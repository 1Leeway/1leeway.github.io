import path from "node:path";
import { Router } from "express";
import { prisma } from "../config/prisma.js";
import { requireAuth } from "../middlewares/auth.js";
import { upload } from "../middlewares/upload.js";
import { categoryFromMimeType, normalizeUserRelativePath } from "../utils/storage.js";

const toSerializableFile = <T extends { sizeBytes: bigint }>(file: T) => ({
  ...file,
  sizeBytes: file.sizeBytes.toString()
});

export const uploadRouter = Router();

uploadRouter.use(requireAuth);

uploadRouter.post("/", upload.array("files", 30), async (req, res, next) => {
  try {
    const uploaded = Array.isArray(req.files) ? req.files : [];

    const created = await Promise.all(
      uploaded.map(async (file) => {
        const relativePath = normalizeUserRelativePath(
          `${req.user!.discordId}/${categoryFromMimeType(file.mimetype)}/${file.filename}`
        );

        return prisma.file.create({
          data: {
            ownerId: req.user!.id,
            name: file.filename,
            originalName: file.originalname,
            mimeType: file.mimetype,
            extension: path.extname(file.originalname).replace(".", "") || null,
            sizeBytes: BigInt(file.size),
            path: relativePath
          }
        });
      })
    );

    res.status(201).json({ files: created.map(toSerializableFile) });
  } catch (error) {
    next(error);
  }
});
