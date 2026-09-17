# User service

The user service is a NestJS API for authenticated user CRUD operations. Data is stored in PostgreSQL through Prisma. Passwords are hashed with bcrypt and are never returned in API responses. Redis stores admin sessions, and RabbitMQ publishes user-created events for the vehicle service.

## Requirements

- Node.js 22 or later;
- npm;
- PostgreSQL with a created database;
- Redis;
- RabbitMQ.

## Installation

```bash
npm install
```

Copy `.env.example` to `.env` and set valid values:

```env
ENV=LOCAL
PORT=3000
DATABASE_URL=postgres://pg-user:pg-password@host:5432/db-name
HASH_SALT_ROUNDS=10
CLIENT_URL=http://localhost:5173
RABBITMQ_CONNECTION_STRING=amqp://localhost
RABBITMQ_QUEUE_NAME=events_queue
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=redis_password
```

`HASH_SALT_ROUNDS` is required and controls bcrypt's cost factor. The application does not read the older `HASH_SALT` variable.

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

The API listens on `http://localhost:3000` by default. With `ENV=LOCAL`, CORS allows `CLIENT_URL` and credentials. In a reverse-proxy deployment, the public API path is `/api/users`.

## Authentication API

Base URL: `http://localhost:3000/admins`.

| Method | Path               | Description                                              |
| ------ | ------------------ | -------------------------------------------------------- |
| `POST` | `/admins/register` | create an administrator                                  |
| `POST` | `/admins/login`    | authenticate an administrator and create a Redis session |
| `POST` | `/admins/logout`   | invalidate the current session                           |

Registration and login use this body shape:

```json
{
  "email": "admin@example.com",
  "password": "StrongPass1"
}
```

The email must be valid. Registration passwords must be 8-64 characters and contain an uppercase letter, a lowercase letter, and a digit. Duplicate admin emails return `409 Conflict`; invalid credentials return `401 Unauthorized`. Login returns a token, `expiresIn` in seconds (`28800`), and the admin ID/email. It also sets the `admin_session` HttpOnly cookie.

## Users API

Base URL: `http://localhost:3000/users`.

All endpoints require an active admin session. Send either `Authorization: Bearer <token>` or the `admin_session` cookie.

| Method   | Path         | Description              |
| -------- | ------------ | ------------------------ |
| `GET`    | `/users`     | get all users            |
| `GET`    | `/users/:id` | get a user by numeric ID |
| `POST`   | `/users`     | create a user            |
| `PUT`    | `/users/:id` | update a user            |
| `DELETE` | `/users/:id` | delete a user            |

### User Request Body

All fields are required for `POST /users`:

```json
{
  "name": "Ada Lovelace",
  "email": "ada@example.com",
  "password": "StrongPass1",
  "birthDate": "1815-12-10"
}
```

`name` must contain 2-50 characters. The email must be valid. The password must be 8-64 characters and contain an uppercase letter, a lowercase letter, and a digit. `birthDate` must be an ISO date between `1900-01-01` and the current date. All fields are optional for `PUT`, but supplied fields use the same validation rules.

Successful responses contain `id`, `name`, `email`, `birthDate`, `createdAt`, and `updatedAt`; `password` is never returned. A duplicate email returns `409 Conflict`, a missing user returns `404 Not Found`, and an invalid body returns `400 Bad Request`.

Creating a user publishes a `USER_CREATED` RabbitMQ event with an initial vehicle payload: `make: "Unknown"`, `model: "Unknown"`, `year: null`, and the new user's numeric `user_id`.

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

The Dockerfile exposes port `3000`. Pass variables from `.env` when starting the container, and make sure PostgreSQL, Redis, and RabbitMQ are reachable from the container. PostgreSQL is not provisioned by the repository's Compose file.

## Related Documentation

- [Project README](../README.md) - complete architecture and local/Compose setup;
- [Frontend README](../frontend/README.md) - client routes and API configuration;
- [Vehicle service README](../vehicle-service/README.md) - vehicle API and RabbitMQ consumer.
