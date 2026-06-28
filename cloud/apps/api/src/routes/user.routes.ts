import { Router } from "express";
import { z } from "zod";
import { prisma } from "../config/prisma.js";
import { requireAuth } from "../middlewares/auth.js";

const profileSchema = z.object({
  displayName: z.string().min(2).max(40).optional(),
  avatar: z.string().url().optional(),
  theme: z.enum(["dark", "light", "system"]).optional()
});

export const userRouter = Router();

userRouter.use(requireAuth);

userRouter.get("/", async (req, res) => {
  res.json({ user: req.user });
});

userRouter.patch("/", async (req, res, next) => {
  try {
    const payload = profileSchema.parse(req.body);

    const updated = await prisma.user.update({
      where: { id: req.user!.id },
      data: payload
    });

    res.json({ user: updated });
  } catch (error) {
    next(error);
  }
});
