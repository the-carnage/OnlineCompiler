# Frontend — Online Compiler UI

Brief: React + Vite frontend providing a code editor UI (Monaco), language selector, input box, and a run button that posts code to the backend compile API.

Prerequisites

- Node.js (16+)

Install

```bash
cd frontend
npm install
```

Run (development)

```bash
npm run dev
# opens Vite dev server (default port 5173)
```

Build / Preview

```bash
npm run build
npm run preview
```

Backend integration

- The frontend expects the backend compile API at `http://localhost:3000/compile/:language`.
- If your backend runs on a different host/port, update the API base URL in the frontend code.

Files of interest

- `src/` — React source (App.jsx, Navbar.jsx, main.jsx)
- `public/` — static assets

Notes

- Make sure the backend is running before trying to run/compile code from the UI.
- The project uses `@monaco-editor/react` for the editor component.

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
