# 🚀 Angular Material Boilerplate

A production-ready **Angulat Material (v20+)** boilerplate designed for fast, secure, and scalable single-page application (SPA) development.

## 🧩 Features

- **ESLint + Prettier** — Linting and code formatting standards  
- **System, Light and Dark** — Seamless adaptive theme switching  
- **Role-based JWT Auth** — Secure login with access & refresh tokens (HTTP-only cookies)  
- **NgRx Store** — Robust and predictable state management  
- **Angular Routing + Lazy Loading**  
- **Utility Libraries:** — Loadash and Day.js  
- **WebSockets (Socket.io)** — Real-time event communication  
- **Environment-based config** — Simple `.env` management  
- **Scalable project structure** — Clean and modular architecture  

🛠️ Generated using <a href="https://github.com/angular/angular-cli" target="_blank">Angular CLI</a> version **20.0.0**

---

## 📁 Project Structure  
src/  
├── app/  
│   ├── auth/  
│   ├── config/    
│   ├── core/  
│   ├── features/    
│   ├── layout/  
│   ├── shared/    
│   ├── store/  
│   ├── theme/  
├── assets/  
├── environments/  
└── main.ts  

---

## 🎨 Theme Customization
Customize the Material design theme using the official Angular Material <a href="https://themes.angular-material.dev/colors" target="_blank">ThemeBuilder</a>

**Steps:**
1. Adjust the color palette to match your brand.  
2. Click **"Export Theme"** (bottom-left corner).  
3. Copy the generated CSS variables.  
4. ThemeBuilder provides separate definitions for Light and Dark themes, e.g.:
   ```css
   /* Light Theme */
   --mat-sys-primary: #235fa3;
   --mat-sys-on-primary: #ffffff;



   /* Dark Theme */
   --mat-sys-primary: #a5c8ff;
   --mat-sys-on-primary: #00315e;
5. Merge them manually (or ask GPT) to generate combo variables:
```css
    --mat-sys-primary: light-dark(#235fa3, #a5c8ff);
    --mat-sys-on-primary: light-dark(#ffffff, #00315e);
```
6. Paste the generated combo variables into ``theme/_combo.scss`` file

---

## 🧭 Routing Configuration

The app uses a **layout-based routing structure** defined in `app.routes.ts`.

### Layouts

#### 1. Auth Layout
- For authentication-related routes (e.g., `/login`, `/signup`)
- Accessible only by unauthenticated users

#### 2. Main Layout
- For protected routes (e.g., `/dashboard`, `/profile`)
- Accessible only by authenticated users

#### 3. Public Routes
- Any route declared outside the above layouts  
- Accessible by all users

---

## 🧱 Code scaffolding

Generate a new component using Angular CLI:

```bash
ng generate component component-name
```

For more schematics (components, directives, pipes, etc.), run:

```bash
ng generate --help
```

## ⚙️ Installation
Install dependencies using the legacy peer dependency flag to avoid version conflicts:

```bash
npm install --legacy-peer-deps
```

## 🧑‍💻 Development

Start the local dev server without **Websocket** support, run:

```bash
npm run dev
```

Start with **Websocket** support, run:

```bash
npm run dev:websocket
```

Once the server is running, open your browser and navigate to `http://localhost:4200`. The application will automatically reload whenever you modify any of the source files.

## 🏗️ Building
Build the project for production:

```bash
npm run build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## 🧪 Running Unit Tests

Execute unit tests using [Karma](https://karma-runner.github.io):

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
