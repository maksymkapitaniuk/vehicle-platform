# Frontend

The frontend is a React 19 single-page application for managing users and vehicles. It uses TypeScript, Vite, Material UI, React Router, React Hook Form, Zod, Axios, and Zustand.

## Features

- view, create, update, and delete users;
- view, create, update, and delete vehicles;
- client-side form validation;
- loading and API error state handling;
- administrator registration, login, logout, and protected management routes;
- local service URLs or Caddy reverse-proxy URLs selected through `VITE_ENV`.

## Requirements

- Node.js 22 or later;
- npm;
- running `user-service` and `vehicle-service` instances;
- an administrator account for protected routes.

## Installation and Usage

```bash
npm install
```

Copy `.env.example` to `.env` and change the service URLs if needed:

```env
VITE_ENV=LOCAL
VITE_USERS_API_URL=http://localhost:3000
VITE_ADMINS_API_URL=http://localhost:3000
VITE_VEHICLES_API_URL=http://localhost:3001
```

With `VITE_ENV=LOCAL`, the frontend uses the configured absolute URLs. With any other value, it uses `/api/users` and `/api/vehicles`, which is the mode required behind the repository's Caddy configuration. The admin API uses the same base URL as the user API; `VITE_ADMINS_API_URL` is retained for configuration compatibility but is not read by the current client.

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

Register an administrator at `/admin/register`, then log in at `/admin/login`. The returned token is stored in browser `localStorage` and sent as a Bearer token with subsequent requests. Protected routes redirect unauthenticated users to the login page.

## Scripts

| Command           | Description                              |
| ----------------- | ---------------------------------------- |
| `npm run dev`     | start Vite with HMR                      |
| `npm run build`   | type-check and create a production build |
| `npm run preview` | serve the production build locally       |
| `npm run lint`    | run ESLint                               |

## UI Routes

| Route                 | Description                |
| --------------------- | -------------------------- |
| `/admin/login`        | administrator login        |
| `/admin/register`     | administrator registration |
| `/users`              | user list                  |
| `/users/:id`          | user profile               |
| `/create-user`        | create a user              |
| `/update-user/:id`    | update a user              |
| `/vehicles`           | vehicle list               |
| `/vehicles/:id`       | vehicle details            |
| `/create-vehicle`     | create a vehicle           |
| `/update-vehicle/:id` | update a vehicle           |

The root route `/` redirects to `/users`. Unknown routes render the not-found page.

## Docker

The Dockerfile builds the Vite application and serves the generated files with Nginx on port `80`. For the repository's Caddy deployment, set `VITE_ENV=PRODUCTION` in `frontend/.env` before building so browser requests use `/api/users` and `/api/vehicles`.

## Related Documentation

- [Project README](../README.md) - complete architecture and local/Compose setup;
- [User service README](../user-service/README.md) - admin API and user CRUD;
- [Vehicle service README](../vehicle-service/README.md) - vehicle API and RabbitMQ integration.
