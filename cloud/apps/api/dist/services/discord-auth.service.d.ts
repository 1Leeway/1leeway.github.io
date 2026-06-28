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
export declare const exchangeDiscordCode: (code: string) => Promise<DiscordTokenResponse>;
export declare const fetchDiscordUser: (accessToken: string) => Promise<DiscordUser>;
export declare const buildDiscordAuthorizeUrl: () => string;
export {};
