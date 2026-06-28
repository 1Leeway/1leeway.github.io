export const errorHandler = (err, _req, res, _next) => {
    if (err instanceof Error) {
        if (err.message.includes("invalid csrf token")) {
            return res.status(403).json({ message: "CSRF token invalid" });
        }
        return res.status(400).json({ message: err.message });
    }
    return res.status(500).json({ message: "Unexpected server error" });
};
//# sourceMappingURL=error-handler.js.map