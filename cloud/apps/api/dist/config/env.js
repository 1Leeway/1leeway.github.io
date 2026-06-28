import dotenv from "dotenv";
import { z } from "zod";
dotenv.config();
const envSchema = z.object({
    NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
    PORT: z.coerce.number().default(4000),
    APP_ORIGIN: z.string().url().default("http://localhost:5173"),
    DATABASE_URL: z.string().min(1),
    JWT_SECRET: z.string().min(20),
    JWT_EXPIRES_IN: z.string().default("7d"),
    COOKIE_DOMAIN: z.string().default("localhost"),
    COOKIE_SECURE: z.coerce.boolean().default(false),
    DISCORD_CLIENT_ID: z.string().min(1),
    DISCORD_CLIENT_SECRET: z.string().min(1),
    DISCORD_REDIRECT_URI: z.string().url(),
    SHARE_TOKEN_SECRET: z.string().min(20),
    MAX_UPLOAD_SIZE_MB: z.coerce.number().positive().default(200)
});
export const env = envSchema.parse(process.env);
//# sourceMappingURL=env.js.map