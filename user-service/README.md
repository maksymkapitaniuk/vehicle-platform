# User service

A NestJS service that provides CRUD operations for users. Data is stored in PostgreSQL through Prisma. Passwords are hashed when users are created and are never returned in API responses.

## Requirements

- Node.js 22 or later;
- PostgreSQL;
- a created database and a connection string for it.

## Installation

```bash
npm install
```

Copy `.env.example` to `.env` and provide the required values:

```env
PORT=3000
DATABASE_URL="postgres://pg-user:pg-password@host:5432/db-name"
HASH_SALT="hash salt"
CLIENT_URL="http://localhost:5173"
```

Apply the Prisma migrations and generate the client:

```bash
npm run prisma:migrate
npm run prisma:generate
```

## Running the Service

```bash
# development with watch mode
npm run start:dev

# production
npm run build
npm run start:prod
```

The API listens on `http://localhost:3000` by default.

## API

Base URL: `http://localhost:3000/users`.

| Method   | Path         | Description                |
| -------- | ------------ | -------------------------- |
| `GET`    | `/users`     | get all users              |
| `GET`    | `/users/:id` | get a user by numeric `id` |
| `POST`   | `/users`     | create a user              |
| `PUT`    | `/users/:id` | update a user              |
| `DELETE` | `/users/:id` | delete a user              |

### Request Body

The following fields are required for `POST /users`:

```json
{
  "name": "Ada Lovelace",
  "email": "ada@example.com",
  "password": "StrongPass1",
  "birthDate": "1815-12-10"
}
```

Constraints: `name` must contain 2-50 characters, the password must contain 8-64 characters including an uppercase letter, a lowercase letter, and a digit, and `birthDate` must be between `1900-01-01` and the current date. All fields are optional for `PUT`.

A successful response contains `id`, `name`, `email`, `birthDate`, `createdAt`, and `updatedAt`. The `password` field is never returned. A duplicate email returns `409 Conflict`, a missing user returns `404 Not Found`, and an invalid request body returns `400 Bad Request`.

## Scripts

| Command                   | Description                     |
| ------------------------- | ------------------------------- |
| `npm run start:dev`       | start in development mode       |
| `npm run build`           | compile TypeScript              |
| `npm run start:prod`      | start the compiled service      |
| `npm run lint`            | run ESLint with automatic fixes |
| `npm run test`            | run unit tests                  |
| `npm run test:e2e`        | run end-to-end tests            |
| `npm run prisma:migrate`  | create/apply a migration        |
| `npm run prisma:generate` | generate the Prisma Client      |

## Docker

The service Dockerfile exposes port `3000`. Pass the variables from `.env` when starting the container, and make sure PostgreSQL is reachable from the container through `DATABASE_URL`.

## Related Component

By default, the frontend connects to this service through `http://localhost:3000`. See the [frontend README](../frontend/README.md).
