# User Management App

A full-stack user management application built **without any backend frameworks**. The entire REST API is crafted from scratch using only Node.js native `http` module with **manual routing** — no Express, no Fastify, no frameworks.

## Highlights

- **Zero backend dependencies** — pure Node.js `http` module
- **Manual routing** — every route is hand-written with `req.method` and `url.pathname`
- **CORS handled manually** — custom headers and preflight (`OPTIONS`) support
- **JSON parsing from scratch** — request body is read and parsed manually via `req.on("data")`
- **React + Vite frontend** — clean UI to interact with the API

## Tech Stack

| Layer    | Technology                          |
| -------- | ----------------------------------- |
| Backend  | Node.js (`node:http`, `node:url`)   |
| Frontend | React 19 + Vite 8                   |
| Linting  | OxLint                              |

## API Endpoints

| Method | Endpoint         | Description                  |
| ------ | ---------------- | ---------------------------- |
| GET    | `/api/users`     | Fetch all users              |
| GET    | `/api/user/:id`  | Fetch a single user by ID    |
| POST   | `/api/users`     | Add a new user or update one |

### Example Responses

**GET** `/api/users`
```json
[
  { "id": 1, "name": "santhosh" },
  { "id": 2, "name": "gowthami" },
  { "id": 3, "name": "chaitanya" },
  { "id": 4, "name": "adithya" }
]
```

**POST** `/api/users`
```json
// Request body
{ "name": "newuser" }

// Response (201 Created)
{ "id": 5, "name": "newuser" }
```

## Project Structure

```
├── server.js          # Backend — vanilla Node.js HTTP server with manual routing
├── crypto.js          # SHA-256 hashing example using node:crypto
├── src/
│   ├── App.jsx        # React frontend — search & add users
│   └── main.jsx       # React entry point
├── index.html         # Vite HTML entry
├── vite.config.js     # Vite configuration
└── package.json
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18+
- npm

### Installation

```bash
git clone https://github.com/santhoshgopisetty/HTTP-ROUTING.git
cd HTTP-ROUTING/express
npm install
```

### Run the API server

```bash
node server.js
# Server is listening on port 5009
```

### Run the frontend (in a separate terminal)

```bash
npm run dev
# Frontend available at http://localhost:5173
```

## Why No Express?

This project was built to understand how HTTP servers work under the hood — handling request methods, parsing URLs, reading request bodies, setting headers, and managing CORS — all manually, without the abstractions that frameworks provide.
