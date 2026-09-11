# Frontend

A React client for managing users and vehicles. The application uses React, TypeScript, Vite, Material UI, React Router, React Hook Form, Zod, and Zustand.

## Features

- view, create, update, and delete users;
- view, create, update, and delete vehicles;
- client-side form validation;
- separate URLs for the user service and vehicle service;
- loading and API error state handling.

## Requirements

- Node.js 22 or later;
- running `user-service` and `vehicle-service` instances.

## Installation and Usage

```bash
npm install
```

Copy `.env.example` to `.env` and change the service URLs if needed:

```env
VITE_USERS_API_URL=http://localhost:3000
VITE_VEHICLES_API_URL=http://localhost:3001
```

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

## Scripts

| Command           | Description                              |
| ----------------- | ---------------------------------------- |
| `npm run dev`     | start Vite in development mode with HMR  |
| `npm run build`   | type-check and create a production build |
| `npm run preview` | preview the production build locally     |
| `npm run lint`    | run ESLint                               |

## UI Routes

| Route                 | Description      |
| --------------------- | ---------------- |
| `/users`              | user list        |
| `/users/:id`          | user profile     |
| `/create-user`        | create a user    |
| `/update-user/:id`    | update a user    |
| `/vehicles`           | vehicle list     |
| `/vehicles/:id`       | vehicle details  |
| `/create-vehicle`     | create a vehicle |
| `/update-vehicle/:id` | update a vehicle |

## Related Services

- [user-service](../user-service/README.md) manages users and uses PostgreSQL;
- [vehicle-service](../vehicle-service/README.md) manages vehicles and uses MongoDB.
