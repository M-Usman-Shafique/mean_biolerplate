![CI](https://github.com/M-Usman-Shafique/mean_mat/actions/workflows/ci.yml/badge.svg)
![CD](https://github.com/M-Usman-Shafique/mean_mat/actions/workflows/cd.yml/badge.svg)

# 🚀 MEAN Monorepo Boilerplate

## 🧩 Features
- **Express.js (TypeScript + ESM)** backend
- **Angular v20+ (Material)** frontend
- **JWT** Authentication
- **Stripe** Payment Integration
- **WebSockets** (Socket.io)
- **Dockerized** setup for client & server
- **GitHub Actions CI/CD** for lint, test, build and push

This repository is designed to help developers start **new full-stack projects** quickly — just clone, rename, and start coding 🚀

---

## 📁 Project Structure  
mean_mat/  
├── client/  
├── server/  
└── docker-compose.yml  
└── docker-compose.dev.yml  

---

## 🐳 Docker Support
### 🧑‍💻 Development
```bash
docker-compose -f docker-compose.dev.yml up
```

### 🏗️ Production
```bash
docker-compose up --build
```
