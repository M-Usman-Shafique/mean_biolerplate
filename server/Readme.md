# 🚀 Express.js TypeScript Boilerplate

A production-ready **Express.js + TypeScript** boilerplate designed for fast, secure, and scalable web API development.

---

## 🧩 Features

- **TypeScript** — Modern, type-safe development  
- **ESLint + Prettier** — Linting and code formatting standards  
- **Jest** — Unit and integration testing framework  
- **MongoDB + Mongoose** — Database with schema modeling  
- **Role-Based JWT Auth** — Secure access & refresh tokens via HTTP-only cookies and headers  
- **Cloudinary Integration** — Image/file uploads & management  
- **Stripe** — Ready-to-use payments integration  
- **WebSockets (Socket.IO)** — Real-time event communication  
- **Environment-based config** — Simple `.env` management  
- **Scalable project structure** — Clean and modular architecture  

---

## 📁 Project Structure  
src/  
│   ├── configs/    
│   ├── controllers/  
│   ├── middlewares/    
│   ├── models/  
│   ├── public/    
│   ├── routes/  
│   ├── services/  
│   ├── types/  
│   ├── utils/  
│   ├── views/  
├── test/  
├── upload/  
└── .env.test/  
└── index.ts 

---

## ⚙️ Environment Variables

Use the provided `.env.test` file as a reference template.
1. Duplicate it and rename to `.env`.
2. Replace the placeholder values with your actual configuration values.

---

## 🧑‍💻 Development
Start local dev server without **Websocket** support, run:

```bash
npm run dev
```

Start with **Websocket** support, run:

```bash
npm run dev:websocket
```

## 🏗️ Building

```bash
npm run build
```

## 🧪 Run Tests

```bash
npm run test
```

## 🧩 TypeScript Type Checking

```bash
npm run ts-check
```

## 💡 Lint Checking

```bash
npm run lint
```

## 📏 Prettier Format Checking

```bash
npm run format
```
