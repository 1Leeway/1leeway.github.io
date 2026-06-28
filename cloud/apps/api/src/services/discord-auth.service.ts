import { env } from "../config/env.js";

interface DiscordTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
}

interface DiscordUser {
  id: string;
  username: string;
  avatar: string | null;
  banner: string | null;
}

export const exchangeDiscordCode = async (code: string) => {
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

  return (await response.json()) as DiscordTokenResponse;
};

export const fetchDiscordUser = async (accessToken: string) => {
  const response = await fetch("https://discord.com/api/users/@me", {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });

  if (!response.ok) {
    throw new Error("Discord user fetch failed");
  }

  return (await response.json()) as DiscordUser;
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
