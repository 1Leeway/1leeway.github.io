export declare const sanitizePathSegment: (value: string) => string;
export declare const normalizeUserRelativePath: (inputPath: string) => string;
export declare const ensureDir: (dirPath: string) => Promise<void>;
export declare const categoryFromMimeType: (mimeType: string) => "Images" | "Videos" | "Documents";
