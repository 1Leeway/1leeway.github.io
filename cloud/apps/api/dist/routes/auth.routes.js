import { Router } from "express";
import crypto from "node:crypto";
import { prisma } from "../config/prisma.js";
import { env } from "../config/env.js";
import { requireAuth } from "../middlewares/auth.js";
import { buildDiscordAuthorizeUrl, exchangeDiscordCode, fetchDiscordUser } from "../services/discord-auth.service.js";
import { signSessionToken } from "../utils/jwt.js";
const SESSION_COOKIE = "cloud_session";
export const authRouter = Router();
authRouter.get("/csrf-token", (req, res) => {
    const csrfToken = req.csrfToken?.() ?? null;
    res.json({ csrfToken });
});
authRouter.get("/discord", (_req, res) => {
    res.redirect(buildDiscordAuthorizeUrl());
});
authRouter.get("/discord/callback", async (req, res, next) => {
    try {
        const code = req.query.code;
        if (typeof code !== "string") {
            return res.status(400).json({ message: "Missing code" });
        }
        const tokenData = await exchangeDiscordCode(code);
        const discordUser = await fetchDiscordUser(tokenData.access_token);
        const user = await prisma.user.upsert({
            where: { discordId: discordUser.id },
            update: {
                username: discordUser.username,
                avatar: discordUser.avatar,
                banner: discordUser.banner,
                lastLoginAt: new Date()
            },
            create: {
                discordId: discordUser.id,
                username: discordUser.username,
                avatar: discordUser.avatar,
                banner: discordUser.banner,
                lastLoginAt: new Date()
            }
        });
        const sessionId = crypto.randomUUID();
        const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
        await prisma.session.create({
            data: {
                userId: user.id,
                token: sessionId,
                userAgent: req.get("user-agent") ?? null,
                ipAddress: req.ip,
                expiresAt
            }
        });
        const signedToken = signSessionToken({
            sub: user.id,
            sid: sessionId
        });
        res.cookie(SESSION_COOKIE, signedToken, {
            httpOnly: true,
            secure: env.COOKIE_SECURE,
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000,
            path: "/"
        });
        return res.redirect(`${env.APP_ORIGIN}/cloud`);
    }
    catch (error) {
        next(error);
    }
});
authRouter.get("/me", requireAuth, async (req, res) => {
    res.json({ user: req.user });
});
authRouter.post("/logout", requireAuth, async (req, res, next) => {
    try {
        if (req.sessionToken) {
            await prisma.session.deleteMany({ where: { token: req.sessionToken } });
        }
        res.clearCookie(SESSION_COOKIE);
        res.json({ message: "Logged out" });
    }
    catch (error) {
        next(error);
    }
});
//# sourceMappingURL=auth.routes.js.map