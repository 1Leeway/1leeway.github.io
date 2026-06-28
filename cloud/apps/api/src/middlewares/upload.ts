import multer from "multer";
import fs from "node:fs";
import path from "node:path";
import { env } from "../config/env.js";
import { categoryFromMimeType, sanitizePathSegment } from "../utils/storage.js";

const storage = multer.diskStorage({
  destination(req, file, cb) {
    if (!req.user) {
      cb(new Error("Unauthorized"), "");
      return;
    }
    const category = categoryFromMimeType(file.mimetype);
    const destination = path.resolve("uploads", req.user.discordId, category);
    fs.mkdirSync(destination, { recursive: true });
    cb(null, destination);
  },
  filename(_req, file, cb) {
    const ext = path.extname(file.originalname);
    const base = path.basename(file.originalname, ext);
    cb(null, `${Date.now()}-${sanitizePathSegment(base)}${ext}`);
  }
});

export const upload = multer({
  storage,
  limits: {
    fileSize: env.MAX_UPLOAD_SIZE_MB * 1024 * 1024
  }
});
