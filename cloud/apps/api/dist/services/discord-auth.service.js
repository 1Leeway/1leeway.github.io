import { env } from "../config/env.js";
export const exchangeDiscordCode = async (code) => {
    const params = new URLSearchParams({
        client_id: env.DISCORD_CLIENT_ID,
        client_secret: env.DISCORD_CLIENT_SECRET,
        grant_type: "authorization_code",
        code,
        redirect_uri: env.DISCORD_REDIRECT_URI
    });
    const response = await fetch("https://discord.com/api/oauth2/token", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    });
    if (!response.ok) {
        throw new Error("Discord token exchange failed");
    }
    return (await response.json());
};
export const fetchDiscordUser = async (accessToken) => {
    const response = await fetch("https://discord.com/api/users/@me", {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });
    if (!response.ok) {
        throw new Error("Discord user fetch failed");
    }
    return (await response.json());
};
export const buildDiscordAuthorizeUrl = () => {
    const params = new URLSearchParams({
        client_id: env.DISCORD_CLIENT_ID,
        redirect_uri: env.DISCORD_REDIRECT_URI,
        response_type: "code",
        scope: "identify",
        prompt: "consent"
    });
    return `https://discord.com/api/oauth2/authorize?${params.toString()}`;
};
//# sourceMappingURL=discord-auth.service.js.map