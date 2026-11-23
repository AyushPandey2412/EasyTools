# Easy Tools

A full-stack modular productivity and engineering tools suite built with **Fastify**, **Sequelize**, **PostgreSQL**, **Next.js (App Router)**, **Material UI (MUI)**, and **Tailwind CSS**.

---

## 1. Project Overview & Architecture Decisions

### Architecture Decisions: Frontend-to-Backend Communication
For client-to-backend communication, we adopt **direct API calls with CORS (`credentials: true`)**:
Direct browser requests from Next.js client components directly to the Fastify backend (`http://localhost:4000`) keep client-side data fetching transparent, avoid unnecessary Node-to-Node proxy latency, and provide a single network lifecycle. Authentication cookies are configured with `httpOnly: true` (preventing script access via XSS) and `sameSite: "lax"`. In production, cookies enforce `secure: true` over HTTPS. In local development across `localhost:3000` and `localhost:4000`, setting `secure: false` over HTTP allows cookies to flow cleanly without third-party cookie restrictions while maintaining origin separation. Cross-Site Request Forgery (CSRF) exposure is mitigated because cross-origin mutating requests (`POST`/`PUT`/`DELETE`) use custom `Content-Type: application/json` headers which require browser preflight (`OPTIONS`), and Fastify enforces strict CORS origin checks (`CORS_ORIGIN`). Protected pages verify authentication on initial load via TanStack Query client requests to a `/me` or session endpoint, and can forward cookie headers from Next.js Server Components if server-side pre-rendering is required.

---

## 2. Tech Stack

- **Backend:** Node.js, Fastify v5, Sequelize v6, PostgreSQL (`pg`), Zod, TypeScript, Vitest.
- **Frontend:** Next.js 15 (App Router), React 19, TypeScript, Material UI (MUI v6), `@mui/material-nextjs`, Tailwind CSS v4, `@tanstack/react-query`, React Hook Form, Zod.
- **Database Workflow:** Raw SQL migrations executed via `psql`. No `sequelize-cli`, no `sequelize.sync()`.

---

## 3. Project Structure

```text
easy-tools/
├── backend/
│   ├── sql/
│   │   └── schema.sql             # Header comment only, tables added manually via psql
│   ├── src/
│   │   ├── config/
│   │   │   └── env.ts             # Zod-validated env, fails fast
│   │   ├── db/
│   │   │   └── sequelize.ts       # Sequelize instance & authenticateDatabase() helper
│   │   ├── features/              # Feature modules (controllers & services)
│   │   │   └── test/
│   │   │       ├── test.service.ts
│   │   │       ├── test.controller.ts
│   │   │       └── test.routes.ts
│   │   ├── plugins/               # Fastify plugins
│   │   ├── routes/
│   │   │   └── health.ts          # GET /health, GET /health/db
│   │   ├── app.ts                 # Fastify instance (pino, helmet, cors, cookie, rate-limit, errors)
│   │   └── server.ts              # Server startup and graceful shutdown
│   ├── tests/
│   │   └── health.test.ts         # Vitest test verifying /health and /test routes
│   ├── .env.example
│   ├── .prettierrc
│   ├── eslint.config.mjs
│   ├── tsconfig.json
│   ├── tsconfig.build.json
│   ├── vitest.config.ts
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── layout.tsx         # Root layout wiring providers and CSS layers
│   │   │   ├── page.tsx           # Root page rendering module view
│   │   │   └── globals.css        # Layer ordering (@layer theme, base, mui, ...) + Tailwind import
│   │   ├── components/
│   │   │   └── providers/
│   │   │       ├── ThemeProvider.tsx # Client component: MUI ThemeProvider + CssBaseline
│   │   │       └── QueryProvider.tsx # Client component: QueryClientProvider
│   │   ├── hooks/                 # Custom TanStack Query hooks
│   │   │   └── useTestQuery.ts
│   │   ├── utils/                 # Frontend API service client & utilities
│   │   │   └── api.ts
│   │   ├── views/                 # Module-wise / feature-wise UI views
│   │   │   └── test/
│   │   │       └── TestView.tsx
│   │   └── lib/
│   │       └── queryClient.ts     # TanStack Query App Router singleton
│   ├── .env.example
│   ├── .prettierrc
│   ├── eslint.config.mjs
│   ├── next.config.ts
│   ├── postcss.config.mjs
│   ├── tsconfig.json
│   └── package.json
├── .gitignore
├── PROGRESS.md
└── README.md
```

---

## 4. Prerequisites

- **Node.js:** v18.18+ (tested with v24.14.1)
- **npm:** v10+ (tested with 11.11.0)
- **Git:** 2.x
- **PostgreSQL:** v16+ (installed natively or via Docker)

---

## 5. Database Setup & SQL Workflow

### Step 1: Create the Local PostgreSQL Database
Run `psql` (or use DBeaver / pgAdmin):
```bash
psql -U postgres -h localhost -p 5432
```
In the SQL prompt:
```sql
CREATE DATABASE easy_tools;
```

### Step 2: Apply Raw SQL Schema
Execute `schema.sql` directly using `psql`:
```bash
psql -U postgres -h localhost -p 5432 -d easy_tools -f backend/sql/schema.sql
```
*(In Phase 1, `schema.sql` only contains comment headers; table definitions will be added in subsequent modules).*

---

## 6. How to Run

### Run Both Concurrently (Recommended)
From the root project directory:
```bash
npm run dev
```
This runs Fastify on `http://localhost:4000` (blue output) and Next.js on `http://localhost:3000` (green output) concurrently in a single terminal.

### Run Individually
- **Backend only:** `npm run dev:backend` (or `cd backend && npm run dev`)
- **Frontend only:** `npm run dev:frontend` (or `cd frontend && npm run dev`)

---

## 7. Verification Endpoints

- Fastify API Health: `GET http://localhost:4000/health`
- Database Connection Health: `GET http://localhost:4000/health/db`
- Frontend Web App: `http://localhost:3000`
