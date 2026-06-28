import path from "node:path";
import fs from "node:fs/promises";
const SAFE_NAME_RE = /[^a-zA-Z0-9_.-]/g;
export const sanitizePathSegment = (value) => {
    return value.replace(SAFE_NAME_RE, "_");
};
export const normalizeUserRelativePath = (inputPath) => {
    const cleaned = inputPath.replace(/\\/g, "/").replace(/^\/+/, "");
    const normalized = path.posix.normalize(cleaned);
    if (normalized.startsWith("..")) {
        throw new Error("Invalid path traversal attempt.");
    }
    return normalized;
};
export const ensureDir = async (dirPath) => {
    await fs.mkdir(dirPath, { recursive: true });
};
export const categoryFromMimeType = (mimeType) => {
    if (mimeType.startsWith("image/"))
        return "Images";
    if (mimeType.startsWith("video/"))
        return "Videos";
    return "Documents";
};
//# sourceMappingURL=storage.js.map