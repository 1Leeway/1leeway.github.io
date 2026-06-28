import { Router } from "express";
import { z } from "zod";
import { prisma } from "../config/prisma.js";
import { requireAuth } from "../middlewares/auth.js";
import { normalizeUserRelativePath } from "../utils/storage.js";

const createFolderSchema = z.object({
  name: z.string().min(1).max(120),
  parentId: z.string().nullable().optional()
});

export const foldersRouter = Router();

foldersRouter.use(requireAuth);

foldersRouter.get("/", async (req, res) => {
  const folders = await prisma.folder.findMany({
    where: { ownerId: req.user!.id },
    orderBy: { updatedAt: "desc" }
  });
  res.json({ folders });
});

foldersRouter.post("/", async (req, res, next) => {
  try {
    const payload = createFolderSchema.parse(req.body);
    const parent = payload.parentId
      ? await prisma.folder.findFirst({ where: { id: payload.parentId, ownerId: req.user!.id } })
      : null;

    const fullPath = normalizeUserRelativePath(parent ? `${parent.path}/${payload.name}` : payload.name);

    const folder = await prisma.folder.create({
      data: {
        ownerId: req.user!.id,
        parentId: parent?.id,
        name: payload.name,
        path: fullPath
      }
    });

    res.status(201).json({ folder });
  } catch (error) {
    next(error);
  }
});

foldersRouter.patch("/:id", async (req, res, next) => {
  try {
    const payload = z
      .object({
        name: z.string().min(1).max(120).optional(),
        isFavorite: z.boolean().optional()
      })
      .parse(req.body);
    const existing = await prisma.folder.findFirst({ where: { id: req.params.id, ownerId: req.user!.id } });

    if (!existing) {
      return res.status(404).json({ message: "Folder not found" });
    }

    const renamed = await prisma.folder.update({
      where: { id: existing.id },
      data: { name: payload.name }
    });

    res.json({ folder: renamed });
  } catch (error) {
    next(error);
  }
});

foldersRouter.delete("/:id", async (req, res, next) => {
  try {
    const existing = await prisma.folder.findFirst({
      where: {
        id: req.params.id,
        ownerId: req.user!.id
      }
    });

    if (!existing) {
      return res.status(404).json({ message: "Folder not found" });
    }

    if (existing.isFavorite) {
      return res.status(403).json({ message: "Favorite folders cannot be deleted" });
    }

    await prisma.file.updateMany({
      where: {
        ownerId: req.user!.id,
        folderId: existing.id,
        isDeleted: false
      },
      data: {
        isDeleted: true
      }
    });

    await prisma.folder.delete({ where: { id: existing.id } });
    res.json({ message: "Folder deleted, files moved to trash" });
  } catch (error) {
    next(error);
  }
});
