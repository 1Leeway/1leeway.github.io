# Nebula Cloud

Modern personal cloud platform (Google Drive / Dropbox / Mega style) with a dark UI inspired by Discord and Windows 11.

## Stack

- Frontend: React, Vite, TypeScript, TailwindCSS, shadcn-style UI primitives, Framer Motion, Lucide, React Router
- Backend: Node.js, Express, TypeScript, Prisma ORM
- Database: SQLite for development (schema compatible with PostgreSQL migration)
- Auth: Discord OAuth2 only (no local password accounts)

## Monorepo Structure

- apps/web: Frontend application
- apps/api: Backend REST API
- uploads: User file storage root

## Features Included

### Auth

- Discord OAuth2 login flow
- Automatic user creation on first login
- Session persistence via HttpOnly cookie + JWT payload
- Stored user fields: discordId, username, avatar, banner, createdAt, lastLoginAt

### File and Folder APIs

- `/auth`
- `/files`
- `/upload`
- `/folders`
- `/share`
- `/user`
- `/settings`

### Security Baseline

- Upload MIME-type validation
- Upload size limits
- Path traversal protection
- CSRF protection
- Helmet + CORS + rate limit
- HttpOnly session cookie

### UI

- Dark, modern cloud dashboard
- Sidebar with required sections
- Grid/List toggle
- Instant search
- Sorting by name/date/size/type
- Drag & drop upload
- Multi-upload with progress, pause, resume, cancel
- Public share page (`/share/:token`)

## Local Setup

1. Install dependencies

```bash
npm install
```

2. Configure backend environment

```bash
cp apps/api/.env.example apps/api/.env
```

3. Add Discord OAuth credentials in `apps/api/.env`

- DISCORD_CLIENT_ID
- DISCORD_CLIENT_SECRET
- DISCORD_REDIRECT_URI

4. Configure frontend environment (optional)

```bash
cp apps/web/.env.example apps/web/.env
```

5. Generate Prisma client and run migration

```bash
cd apps/api
npx prisma generate
npx prisma migrate dev --name init
cd ../..
```

6. Start both apps

```bash
npm run dev
```

- Frontend: http://localhost:5173
- Backend: http://localhost:4000

## Build

```bash
npm run build
```

## Notes for Next Iterations

- Preview engine for images/video/pdf/audio/code (dedicated viewer module)
- Chunked resumable uploads (tus/S3 multipart style)
- Collaborative sharing and version history
- OCR / AI upscaling pipeline
- Desktop and mobile clients
