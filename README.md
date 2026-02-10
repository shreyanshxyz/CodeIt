# CodeIt

CodeIt is a full-stack interactive coding platform that provides a seamless environment for coding practice. Built with Next.js 15, PostgreSQL, and NextAuth.js v5, it features a built-in code editor, a diverse set of coding problems, and integrated test cases with real-time submission tracking.

## Features

- 🎯 **Coding Problems** - Curated algorithm problems with varying difficulty
- 💻 **Code Editor** - Monaco-like editor with syntax highlighting
- ⚡ **Real-time Execution** - Code execution with test case validation
- 🔐 **Authentication** - Secure auth with GitHub, Google, and email/password
- 📊 **Progress Tracking** - Track your problem-solving journey
- 🏆 **Achievements** - Unlock achievements as you progress
- 🚀 **Scalable Architecture** - Built for production with PostgreSQL

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, PostgreSQL, pg (node-postgres)
- **Auth**: NextAuth.js v5
- **Code Editor**: CodeMirror 6
- **Database**: PostgreSQL with connection pooling
- **Validation**: Zod

## Prerequisites

- Node.js 20+ or Bun
- PostgreSQL 16+ (or Docker)
- Git

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/shreyanshxyz/CodeIt
cd CodeIt
```

### 2. Install Dependencies

```bash
bun install
# or
npm install
```

### 3. Set Up Environment Variables

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Update the values in `.env` with your configuration.

### 4. Start PostgreSQL Database

Using Docker (recommended):

```bash
docker-compose up -d
```

Or use your local PostgreSQL installation.

### 5. Initialize Database

Run migrations and seed data:

```bash
bun run db:setup
# or
npm run db:setup
```

### 6. Generate NextAuth Secret

```bash
openssl rand -base64 32
```

Update `NEXTAUTH_SECRET` in your `.env` file with the generated value.

### 7. Start Development Server

```bash
bun run dev
# or
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `GET /api/auth/me` - Get current user
- `GET|POST /api/auth/[...nextauth]` - NextAuth.js routes

### Problems
- `GET /api/problems` - List all problems (supports pagination & filtering)
- `GET /api/problems/:id` - Get single problem with user progress

### Submissions
- `POST /api/submissions` - Submit code solution
- `GET /api/submissions` - Get user submissions
- `GET /api/submissions/:id` - Get submission details

### Progress
- `GET /api/users/:id/progress` - Get user statistics

### Health
- `GET /api/health` - Health check endpoint

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `DB_HOST` | PostgreSQL host | `localhost` |
| `DB_PORT` | PostgreSQL port | `5432` |
| `DB_NAME` | Database name | `codeit` |
| `DB_USER` | Database user | `postgres` |
| `DB_PASSWORD` | Database password | `postgres` |
| `NEXTAUTH_URL` | App URL | `http://localhost:3000` |
| `NEXTAUTH_SECRET` | NextAuth secret | (required) |
| `GITHUB_CLIENT_ID` | GitHub OAuth client ID | (optional) |
| `GITHUB_CLIENT_SECRET` | GitHub OAuth secret | (optional) |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID | (optional) |
| `GOOGLE_CLIENT_SECRET` | Google OAuth secret | (optional) |

## Screenshots

- Main Page
  ![main_page.png](https://pasteimg.com/images/2023/12/28/main_page.png)
- Problem
  ![problemset.png](https://pasteimg.com/images/2023/12/28/problemset.png)
- Code Playground
  ![playground.png](https://pasteimg.com/images/2023/12/28/playground.png)
- Confetti
  ![confetti.png](https://pasteimg.com/images/2023/12/28/confetti.png)

## License

MIT
