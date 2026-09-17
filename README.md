# Vehicle Platform

Vehicle Platform is a web application for managing users and their vehicles. It consists of a React frontend and two independent backend services:

- `frontend` - React 19 application built with Vite and Material UI;
- `user-service` - NestJS API backed by PostgreSQL and Prisma, with admin authentication and Redis sessions;
- `vehicle-service` - Express API backed by MongoDB and Mongoose;
- RabbitMQ - transports the `USER_CREATED` event between the backend services;
- Caddy - reverse proxy for the containerized deployment.

## Architecture

```text
Browser
  |
  +-- local development --> frontend:5173
  |                            |--> user-service:3000 --> PostgreSQL
  |                            |--> vehicle-service:3001 --> MongoDB
  |                            +--> admin sessions --> Redis
  |                            +--> USER_CREATED event --> RabbitMQ
  |
  +-- Docker deployment --> Caddy:80/443
                               |--> frontend:80
                               |--> /api/users/* --> user-service:3000
                               |--> /api/vehicles/* --> vehicle-service:3001
```

When a user is created, `user-service` publishes `USER_CREATED`. The vehicle service consumes the event and creates an initial vehicle with `make` and `model` set to `Unknown`, `year` set to `null`, and the new user's numeric ID.

## Requirements

- Node.js 22 or later;
- npm;
- PostgreSQL database;
- MongoDB instance;
- Redis instance;
- RabbitMQ instance.

PostgreSQL and MongoDB are not defined in `compose.yaml`, so they must be provided separately in both local and Docker-based setups.

## Local Development

Create environment files from the examples, then install dependencies in each application:

```bash
copy .env.example .env
copy frontend\.env.example frontend\.env
copy user-service\.env.example user-service\.env
copy vehicle-service\.env.example vehicle-service\.env

cd frontend && npm install
cd ..\user-service && npm install
cd ..\vehicle-service && npm install
```

Set valid PostgreSQL, MongoDB, Redis, and RabbitMQ connection values in the service environment files. `user-service` also requires `HASH_SALT_ROUNDS`; this is the bcrypt cost factor used for passwords.

Prepare the user-service database and start the services in separate terminals:

```bash
cd user-service
npm run prisma:migrate
npm run prisma:generate
npm run start:dev
```

```bash
cd vehicle-service
npm run dev
```

```bash
cd frontend
npm run dev
```

Open `http://localhost:5173`. Register an administrator at `/admin/register`, then sign in at `/admin/login`. All user and vehicle API operations require an active admin session.

Default local endpoints:

| Component       | URL                     |
| --------------- | ----------------------- |
| Frontend        | `http://localhost:5173` |
| User service    | `http://localhost:3000` |
| Vehicle service | `http://localhost:3001` |

## Docker Compose

The Compose stack starts Redis, RabbitMQ, Caddy, the frontend, and both backend services:

```bash
copy .env.example .env
copy user-service\.env.example user-service\.env
copy vehicle-service\.env.example vehicle-service\.env
docker compose up --build -d
```

Before starting, configure the service `.env` files with connection strings reachable from containers. In particular, `localhost` inside a container refers to that container, not the host machine. Use a reachable host name or Docker network address for PostgreSQL, MongoDB, Redis, and RabbitMQ.

The frontend Docker image is built with Vite. For the reverse-proxy deployment, set `frontend/.env` to use relative API paths before building:

```env
VITE_ENV=PRODUCTION
```

The Caddyfile is configured for `vehicle-platform.duckdns.org`, publishes ports `80` and `443`, and routes `/api/users/*` and `/api/vehicles/*` to the corresponding services. Update the hostname in `Caddyfile` when deploying under another domain. Caddy's automatic HTTPS also requires the domain DNS to point to the server.

Stop the stack with:

```bash
docker compose down
```

Named volumes preserve Redis, RabbitMQ, and Caddy data. Removing them requires an explicit `docker compose down -v`.

## API Summary

The complete endpoint documentation is maintained in the service READMEs:

- [User service](user-service/README.md) - admin registration/login/logout and authenticated user CRUD;
- [Vehicle service](vehicle-service/README.md) - vehicle CRUD, validation, and RabbitMQ integration;
- [Frontend](frontend/README.md) - UI routes, environment variables, and frontend scripts.

In local mode, the frontend calls the backend URLs directly. In production mode, it calls `/api/users` and `/api/vehicles`, which Caddy proxies to the backend services.

## Validation

Run the checks relevant to a component after changing it:

```bash
cd frontend && npm run lint && npm run build
cd ..\user-service && npm run lint && npm run build && npm test
cd ..\vehicle-service && npm run lint
```

The user service also provides `npm run test:e2e`; it requires the configured test dependencies and database environment.

## Repository Layout

```text
frontend/       React client
user-service/   NestJS, Prisma, PostgreSQL, Redis, RabbitMQ publisher
vehicle-service/ Express, Mongoose, MongoDB, RabbitMQ consumer
compose.yaml    Container orchestration
Caddyfile       Reverse-proxy and HTTPS configuration
```
