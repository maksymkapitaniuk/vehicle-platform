import 'dotenv/config';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import errorHandler from './common/middleware/error-handler.js';

const app = express();

const environment = process.env.ENV ?? 'LOCAL';
const port = process.env.PORT ?? 3000;
const clientUrl = process.env.CLIENT_URL ?? 'http://localhost:5173';
const rabbitMqServicePromise = import('./vehicles/rabbitmq-service.js');

app.use(helmet());

if (environment === 'LOCAL') {
  const corsOptions = {
    origin: clientUrl,
    credentials: true,
  };
  app.use(cors(corsOptions));
}

app.use(express.json());

const { shutdownRabbitMqConsumer, startRabbitMqConsumer } =
  await rabbitMqServicePromise;
startRabbitMqConsumer();

const { default: vehiclesRouter } = await import('./vehicles/routes.js');
app.use('/vehicles', vehiclesRouter);
app.use(errorHandler);

const server = app.listen(port, () =>
  console.log(`Server is listening at ${port}`),
);

let isShuttingDown = false;
const shutdown = async (signal) => {
  if (isShuttingDown) {
    return;
  }

  isShuttingDown = true;
  console.log(`${signal} received, shutting down`);

  server.close(async () => {
    await shutdownRabbitMqConsumer();
    process.exit(0);
  });
};

process.once('SIGINT', () => shutdown('SIGINT'));
process.once('SIGTERM', () => shutdown('SIGTERM'));
