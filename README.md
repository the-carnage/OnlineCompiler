# Online Compiler

A web-based code editor and execution environment supporting Python, C++, and JavaScript. Built with React + Monaco Editor on the frontend and Express on the backend.

![Languages](https://img.shields.io/badge/languages-Python%20%7C%20C%2B%2B%20%7C%20JavaScript-blue)
![Frontend](https://img.shields.io/badge/frontend-React%20%2B%20Vite-61dafb)
![Backend](https://img.shields.io/badge/backend-Node.js%20%2B%20Express-green)

---

## Features

- **Monaco Editor** — the same editor that powers VS Code, with full syntax highlighting
- **Multi-language support** — Python, C++, and JavaScript
- **Stdin support** — provide custom input to your programs
- **Dark / Light theme** — toggle the editor theme via a dropdown
- **Live output** — stdout and stderr displayed instantly after execution
- **Responsive UI** — works on desktop and mobile

---

## Project Structure

```
Online Compiler/
├── frontend/          # React + Vite app
│   ├── src/
│   │   ├── App.jsx    # Main component (editor, controls, output)
│   │   ├── App.css    # VS Code-inspired dark theme styles
│   │   └── main.jsx   # React entry point
│   ├── .env           # VITE_BACKEND_URL config
│   └── package.json
└── backend/           # Express server
    ├── index.js       # All routes and code execution logic
    └── package.json
```

---

## Prerequisites

Make sure the following are installed and available in your `PATH`:

| Requirement          | Purpose                                        |
| -------------------- | ---------------------------------------------- |
| Node.js 16+          | Run frontend, backend, and JavaScript programs |
| Python 3 (`python3`) | Execute Python programs                        |
| g++ / GCC            | Compile and run C++ programs                   |

---

## Getting Started

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd "Online Compiler"
```

### 2. Start the backend

```bash
cd backend
npm install
npm start        # starts on http://localhost:3000
```

### 3. Start the frontend

Open a new terminal:

```bash
cd frontend
npm install
npm run dev      # starts on http://localhost:5173
```

Then open [http://localhost:5173](http://localhost:5173) in your browser.

### Frontend environment variable

The frontend reads the backend URL from `frontend/.env`:

```env
VITE_BACKEND_URL=http://localhost:3000/compile
```

Update this to point at your deployed backend if needed.

---

## API Reference

Base URL: `http://localhost:3000`

### `GET /start`

Health-check / warmup endpoint.

**Response:** `200 OK` — plain text `"ok"`

---

### `POST /compile/:language`

Compile and execute code. `:language` must be `python`, `cpp`, or `javascript`.

**Request body:**

```json
{
  "code": "print('Hello, World!')",
  "input": "optional stdin string"
}
```

**Response:**

```json
{
  "stdout": "Hello, World!\n",
  "stderr": ""
}
```

If compilation fails (e.g., C++ syntax error), `stderr` is populated and `stdout` will be empty.

---

## Supported Languages

| Language   | Execution                            | Default placeholder      |
| ---------- | ------------------------------------ | ------------------------ |
| Python     | `python3 main.py`                    | `#Write your code here`  |
| C++        | `g++ main.cpp -o main` then `./main` | `//Write your code here` |
| JavaScript | `node main.js`                       | `//Write your code here` |

For C++, the backend compiles first and short-circuits with compile errors if `g++` produces any stderr — the binary is only run if compilation succeeds.

---

## Tech Stack

### Frontend

| Package              | Role                       |
| -------------------- | -------------------------- |
| React 19             | UI framework               |
| Vite 7               | Build tool and dev server  |
| @monaco-editor/react | VS Code-grade code editor  |
| react-select         | Language and theme pickers |

### Backend

| Package                  | Role                                    |
| ------------------------ | --------------------------------------- |
| Express 5                | HTTP server and routing                 |
| cors                     | Cross-origin request handling           |
| nodemon                  | Auto-restart during development         |
| child_process (built-in) | Spawning compiler/interpreter processes |

---

## Security Warning

> **This server executes arbitrary user-submitted code.**
> Do NOT deploy to production without proper sandboxing (e.g., Docker containers, gVisor, or a dedicated code execution service).
> The current implementation writes code to temp files and runs them directly on the host system.

---

## Scripts

### Backend

```bash
npm start     # nodemon index.js
```

### Frontend

```bash
npm run dev      # Vite dev server
npm run build    # Production build → dist/
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

---

## Deployment

The project is deployed on [Render.com](https://render.com):

- **Backend:** `https://onlinecompilerbackend-tlz8.onrender.com`
- The frontend's `VITE_BACKEND_URL` should point to the deployed backend URL when building for production.

> Note: Render.com free tier spins down after inactivity. The frontend fires a warmup request on load to reduce cold-start latency.
