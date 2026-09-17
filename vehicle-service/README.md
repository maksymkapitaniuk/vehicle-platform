# Vehicle service

The vehicle service is an Express API for vehicle CRUD operations. Data is stored in MongoDB through Mongoose, request bodies are validated with Zod, and the service consumes `USER_CREATED` events from RabbitMQ.

## Requirements

- Node.js 22 or later;
- npm;
- an available MongoDB instance and connection string;
- RabbitMQ.

## Installation

```bash
npm install
```

Copy `.env.example` to `.env` and set valid values:

```env
ENV=LOCAL
PORT=3001
CONNECTION_STRING=mongodb://localhost:27017/vehicle-platform
CLIENT_URL=http://localhost:5173
RABBITMQ_CONNECTION_STRING=amqp://localhost
RABBITMQ_QUEUE_NAME=events_queue
```

The service retries the RabbitMQ connection every five seconds if the broker is temporarily unavailable. It can start without an active broker, but user-created vehicle events will not be processed until the connection succeeds.

## Running the Service

```bash
# development with Node.js watch mode
npm run dev

# regular start
npm start
```

The API listens on `http://localhost:3001` by default. On startup, the service connects to MongoDB first. The process exits if `CONNECTION_STRING` is missing or the database is unavailable. In a reverse-proxy deployment, the public API path is `/api/vehicles`.

## API

Base URL: `http://localhost:3001/vehicles`.

| Method   | Path            | Description                       |
| -------- | --------------- | --------------------------------- |
| `GET`    | `/vehicles`     | get all vehicles                  |
| `GET`    | `/vehicles/:id` | get a vehicle by MongoDB ObjectId |
| `POST`   | `/vehicles`     | create a vehicle                  |
| `PUT`    | `/vehicles/:id` | partially update a vehicle        |
| `DELETE` | `/vehicles/:id` | delete a vehicle                  |

### Request Body

All fields are required for `POST /vehicles`:

```json
{
  "make": "Toyota",
  "model": "Corolla",
  "year": 2022,
  "user_id": 1
}
```

`make` must contain 2-50 characters, `model` 2-100 characters, `year` must be a number between 1800 and the current year or `null`, and `user_id` must be a number. Request bodies must not contain unknown fields. All fields are optional for `PUT`, but provided fields use the same validation rules.

Successful responses return a MongoDB document with an `_id` field. An invalid request body returns `422` with validation details. A MongoDB validation or cast error for a vehicle field also returns `422`; a missing or invalid ObjectId returns `404`, and other MongoDB errors return `500`.

## RabbitMQ Integration

The service listens on `RABBITMQ_QUEUE_NAME`, which defaults to `events_queue`. For a `USER_CREATED` event it validates the payload and creates the described vehicle. The default publisher payload is `make: "Unknown"`, `model: "Unknown"`, `year: null`, and the created user's numeric `user_id`. Other event patterns are acknowledged and ignored. Invalid event payloads are rejected without requeueing.

## Scripts

| Command       | Description                   |
| ------------- | ----------------------------- |
| `npm run dev` | start with Node.js watch mode |
| `npm start`   | start the service             |

## Docker

The Dockerfile exposes port `3001`. Pass variables from `.env` when starting the container, and make sure MongoDB and RabbitMQ are reachable from the container. MongoDB is not provisioned by the repository's Compose file.

## Related Documentation

- [Project README](../README.md) - complete architecture and local/Compose setup;
- [Frontend README](../frontend/README.md) - client routes and API configuration;
- [User service README](../user-service/README.md) - user API and event publisher.
