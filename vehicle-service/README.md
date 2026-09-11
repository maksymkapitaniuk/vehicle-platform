# Vehicle service

An Express service that provides CRUD operations for vehicles. Data is stored in MongoDB through Mongoose, and request bodies are validated with Zod.

## Requirements

- Node.js 22 or later;
- an available MongoDB instance;
- a MongoDB connection string.

## Installation

```bash
npm install
```

Copy `.env.example` to `.env` and provide the required values:

```env
PORT=3001
CONNECTION_STRING="mongodb://localhost:27017/vehicle-platform"
CLIENT_URL="http://localhost:5173"
```

## Running the Service

```bash
# development with Node.js watch mode
npm run dev

# regular start
npm start
```

The API listens on `http://localhost:3001` by default. On startup, the service connects to MongoDB first. The process exits if `CONNECTION_STRING` is missing or the database is unavailable.

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

`make` must contain 2-50 characters, `model` 2-100 characters, `year` must be a number between 1800 and the current year or `null`, and `user_id` must be a number. All fields are optional for `PUT`, but provided fields are subject to the same validation rules.

Successful responses return a MongoDB document with an `_id` field. An invalid request body or MongoDB validation error returns `422`, a missing or invalid ObjectId returns `404`, and MongoDB errors return `500`.

## Scripts

| Command       | Description                                   |
| ------------- | --------------------------------------------- |
| `npm run dev` | start in development mode with `node --watch` |
| `npm start`   | start the service                             |

## Docker

The service Dockerfile exposes port `3001`. Pass the variables from `.env` when starting the container, and make sure MongoDB is reachable from the container through `CONNECTION_STRING`.

## Related Components

- By default, the frontend connects to this service through `http://localhost:3001`.
- Vehicle ownership is stored as a numeric `user_id`; the service does not verify the user's existence across services.
- See the [frontend README](../frontend/README.md) and [user-service README](../user-service/README.md).
