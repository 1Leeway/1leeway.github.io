interface SessionPayload {
    sub: string;
    sid: string;
}
export declare const signSessionToken: (payload: SessionPayload) => string;
export declare const verifySessionToken: (token: string) => SessionPayload;
export {};
