# 🚀 Awesome DevOps Dashboard

Real-time monitoring dashboard for your GitHub repositories with CI/CD integration, PR analytics, and beautiful metrics visualization.

![Build Status](https://img.shields.io/github/actions/workflow/status/awesome-devops-dashboard/ci.yml?branch=main)
![Docker](https://img.shields.io/badge/docker-ready-brightgreen)
![License](https://img.shields.io/badge/license-MIT-blue)

## ✨ Features

- 📊 **Real-time Repo Statistics** - PRs, issues, deployments, and health scores
- 📈 **Activity Analytics** - Trend charts and metrics visualization
- 🔍 **Detailed Metrics** - Branch health, commit frequency, CI/CD status
- 🎨 **Modern UI** - Clean, responsive design with dark mode
- 🐳 **Containerized** - Full Docker setup with docker-compose
- 🔒 **Secure** - JWT authentication and rate limiting
- 🚀 **Auto-Deploy** - CI/CD pipeline with GitHub Actions

## 🏗️ Architecture

```
awesome-devops-dashboard/
├── backend/           # Node.js API with GitHub integration
├── frontend/          # React dashboard
├── docker-compose.yml # Orchestration
└── .github/workflows/ # CI/CD pipelines
```

## 🚀 Quick Start

```bash
# Clone
git clone https://github.com/MohamedAbdelwahab24/awesome-devops-dashboard.git
cd awesome-devops-dashboard

# Start services
docker-compose up -d

# Access dashboard
open http://localhost:3000
```

## 📦 Stack

**Backend:** Node.js + Express + PostgreSQL + GitHub API + JWT
**Frontend:** React + TypeScript + Tailwind CSS + Chart.js
**DevOps:** Docker + Docker Compose + GitHub Actions

## 📄 License

MIT License - Free to use and modify
