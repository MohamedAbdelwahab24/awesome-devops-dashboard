# 🚀 Awesome DevOps Dashboard

A full-stack DevOps dashboard for tracking GitHub repositories, repo health, and basic engineering metrics.

![CI](https://github.com/MohamedAbdelwahab24/awesome-devops-dashboard/actions/workflows/ci.yml/badge.svg?branch=master)
![License](https://img.shields.io/badge/license-MIT-blue)
![Docker](https://img.shields.io/badge/docker-supported-2496ED?logo=docker&logoColor=white)

---

## ✨ Current Functionality

### Frontend (React + Vite)
- Login screen with demo auth flow (`admin / admin123`)
- Protected routes with persisted local session
- Dashboard listing repositories for the logged-in GitHub username
- Health score indicator per repository
- Quick repo stats view (health score, commits, open PRs, open issues)
- Link from each repository card to open the repo on GitHub

### Backend (Node.js + Express)
- `POST /api/auth/login` for JWT login (demo credentials)
- `GET /api/repos/user/:username` to fetch user repositories
- `GET /api/repos/stats/:username/:repo` for repository metrics
- `GET /api/repos/activity/:username/:repo` for activity breakdown
- Security middleware: `helmet`, `cors`, and rate limiting
- Health endpoint: `GET /health`

### CI/CD
- GitHub Actions workflow runs backend + frontend checks
- Docker image build step for backend and frontend
- Pipeline currently validates build/test flow

> Note: The workflow has a `Deploy to production` placeholder step. It does **not** publish a live app yet until real deploy commands are added.

---

## 🧱 Tech Stack

- **Frontend:** React, Vite, React Router, Recharts, Lucide Icons
- **Backend:** Node.js, Express, Axios, JWT, Helmet, Rate Limit
- **Infra/DevOps:** Docker, Docker Compose, GitHub Actions
- **Database:** PostgreSQL (available in compose stack)

---

## 📁 Project Structure

```bash
awesome-devops-dashboard/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── middleware/
│   │   └── routes/
│   ├── Dockerfile
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   └── pages/
│   ├── Dockerfile
│   └── package.json
├── docker-compose.yml
└── .github/workflows/ci.yml
```

---

## ⚙️ Environment Variables

Create `backend/.env` (or set via compose environment):

```env
PORT=3000
JWT_SECRET=your-super-secret-key
GITHUB_TOKEN=your_github_personal_access_token
DATABASE_URL=postgresql://postgres:password@postgres:5432/devops
NODE_ENV=development
```

`frontend` currently calls backend at `http://localhost:3000`.

---

## 🚀 Run Locally

### Option 1: Docker Compose (recommended)

```bash
git clone https://github.com/MohamedAbdelwahab24/awesome-devops-dashboard.git
cd awesome-devops-dashboard

# Provide required vars (at least GITHUB_TOKEN + JWT_SECRET)
export GITHUB_TOKEN=your_token
export JWT_SECRET=your_secret

docker compose up --build
```

Open:
- Frontend: `http://localhost:3001`
- Backend health: `http://localhost:3000/health`

---

### Option 2: Run services manually

#### Backend
```bash
cd backend
npm install
npm run dev
```

#### Frontend
```bash
cd frontend
npm install
npm run dev
```

---

## 🔐 Demo Login

Use these credentials in the UI:
- **Username:** `admin`
- **Password:** `admin123`

---

## 📌 Roadmap Ideas

- Real production deploy target (Render/Vercel/Railway/EC2)
- Replace demo auth with real user system (DB-backed)
- Better activity visualizations from live API data
- Add unit/integration tests for frontend and backend routes
- Add environment-based API URL config for frontend

---

## 📄 License

MIT
