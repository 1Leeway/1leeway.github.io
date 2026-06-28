import { Router } from "express";
import path from "node:path";
import { z } from "zod";
import { prisma } from "../config/prisma.js";
import { requireAuth } from "../middlewares/auth.js";

const toSerializableFile = <T extends { sizeBytes: bigint }>(file: T) => ({
  ...file,
  sizeBytes: file.sizeBytes.toString()
});

export const filesRouter = Router();

filesRouter.use(requireAuth);

filesRouter.get("/", async (req, res) => {
  const querySchema = z.object({
    search: z.string().optional(),
    folderId: z.string().optional(),
    isFavorite: z.coerce.boolean().optional(),
    sortBy: z.enum(["name", "createdAt", "sizeBytes", "mimeType"]).default("createdAt"),
    order: z.enum(["asc", "desc"]).default("desc")
  });

  const query = querySchema.parse(req.query);

  const files = await prisma.file.findMany({
    where: {
      ownerId: req.user!.id,
      isDeleted: false,
      isFavorite: query.isFavorite,
      folderId: query.folderId ? (query.folderId === "root" ? null : query.folderId) : undefined,
      name: query.search ? { contains: query.search } : undefined
    },
    orderBy: {
      [query.sortBy]: query.order
    }
  });

  res.json({ files: files.map(toSerializableFile) });
});

filesRouter.get("/favorites", async (req, res) => {
  const files = await prisma.file.findMany({
    where: {
      ownerId: req.user!.id,
      isDeleted: false,
      isFavorite: true
    },
    orderBy: {
      updatedAt: "desc"
    }
  });

  res.json({ files: files.map(toSerializableFile) });
});

filesRouter.get("/trash", async (req, res) => {
  const files = await prisma.file.findMany({
    where: {
      ownerId: req.user!.id,
      isDeleted: true
    },
    orderBy: {
      updatedAt: "desc"
    }
  });

  res.json({ files: files.map(toSerializableFile) });
});

filesRouter.post("/:id/restore", async (req, res, next) => {
  try {
    const file = await prisma.file.findFirst({
      where: {
        id: req.params.id,
        ownerId: req.user!.id,
        isDeleted: true
      }
    });

    if (!file) {
      return res.status(404).json({ message: "File not found in trash" });
    }

    const restored = await prisma.file.update({
      where: { id: file.id },
      data: { isDeleted: false }
    });

    res.json({ file: toSerializableFile(restored) });
  } catch (error) {
    next(error);
  }
});

filesRouter.get("/:id/content", async (req, res) => {
  const file = await prisma.file.findFirst({
    where: {
      id: req.params.id,
      ownerId: req.user!.id,
      isDeleted: false
    }
  });

  if (!file) {
    return res.status(404).json({ message: "File not found" });
  }

  const uploadsRoot = path.resolve("uploads");
  const absolutePath = path.resolve(uploadsRoot, file.path);

  if (!absolutePath.startsWith(uploadsRoot)) {
    return res.status(400).json({ message: "Invalid file path" });
  }

  res.type(file.mimeType);
  return res.sendFile(absolutePath);
});

filesRouter.patch("/:id", async (req, res, next) => {
  try {
    const payload = z
      .object({
        name: z.string().min(1).max(255).optional(),
        isFavorite: z.boolean().optional(),
        folderId: z.string().nullable().optional()
      })
      .parse(req.body);

    const file = await prisma.file.findFirst({ where: { id: req.params.id, ownerId: req.user!.id } });
    if (!file) {
      return res.status(404).json({ message: "File not found" });
    }

    const updated = await prisma.file.update({
      where: { id: file.id },
      data: payload
    });

    res.json({ file: toSerializableFile(updated) });
  } catch (error) {
    next(error);
  }
});

filesRouter.delete("/:id", async (req, res, next) => {
  try {
    const existing = await prisma.file.findFirst({
      where: { id: req.params.id, ownerId: req.user!.id, isDeleted: false }
    });

    if (!existing) {
      return res.status(404).json({ message: "File not found" });
    }

    if (existing.isFavorite) {
      return res.status(403).json({ message: "Favorite files cannot be deleted" });
    }

    await prisma.file.updateMany({
      where: { id: req.params.id, ownerId: req.user!.id },
      data: { isDeleted: true }
    });
    res.json({ message: "File moved to trash" });
  } catch (error) {
    next(error);
  }
});
