# Discord OAuth Backend (1leeway)

## Important securite
Tu as partage des secrets Discord dans le chat (token bot + client secret).
Rotation immediate recommandee dans le Developer Portal:
1. Regenerer `Client Secret`
2. Regenerer `Bot Token`
3. Ne jamais commiter ces valeurs dans le repo

## Setup
1. Copier `.env.example` en `.env`
2. Renseigner les variables:
   - `FRONTEND_URL` (ex: https://1leeway.github.io)
   - `BACKEND_URL` (ex: https://ton-backend.onrender.com)
   - `DISCORD_CLIENT_ID`
   - `DISCORD_CLIENT_SECRET`
   - `SESSION_SECRET`

3. Installer et lancer:

```bash
cd server
npm install
npm start
```

## Discord Developer Portal
Dans OAuth2, ajoute cette redirect URI exacte:
`{BACKEND_URL}/api/auth/discord/callback`

## Frontend
Le front utilise `backendBaseUrl` dans `Sources/scripts.js`.

Par defaut: `window.location.origin`.
Si le backend est sur un autre domaine, ouvre la console navigateur et lance:

```js
localStorage.setItem('backendBaseUrl', 'https://ton-backend.onrender.com');
location.reload();
```

## Routes disponibles
- `GET /api/auth/discord/login`
- `GET /api/auth/discord/callback`
- `GET /api/auth/discord/me`
- `POST /api/auth/discord/logout`
- `GET /api/health`
