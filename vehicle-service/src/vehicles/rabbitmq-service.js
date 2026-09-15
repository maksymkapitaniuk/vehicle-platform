import amqp from 'amqplib';
import { CreateVehicleDto } from './vehicle-dto.js';

const rabbitMqUrl =
  process.env.RABBITMQ_CONNECTION_STRING ?? 'amqp://localhost';
const queueName = process.env.RABBITMQ_QUEUE_NAME ?? 'events_queue';
const retryDelayMs = 5000;

let connection;
let channel;
let consumerTag;
let startPromise;
let shutdownPromise;
let isShuttingDown = false;
const currentTasks = new Set();

const delay = (milliseconds) =>
  new Promise((resolve) => setTimeout(resolve, milliseconds));

async function consumeMessage(message) {
  if (!message) {
    return;
  }

  let packet;

  try {
    packet = JSON.parse(message.content.toString());
  } catch (error) {
    console.error('Cannot parse RabbitMQ message:', error);
    channel.nack(message, false, false);
    return;
  }

  if (packet.pattern !== 'USER_CREATED') {
    channel.ack(message);
    return;
  }

  try {
    const dto = CreateVehicleDto.parse(packet.data);
    const { default: vehiclesController } = await import('./controller.js');
    await vehiclesController.create(dto);
    channel.ack(message);
  } catch (error) {
    console.error('Cannot create vehicle from RabbitMQ event:', error);
    channel.nack(message, false, false);
  }
}

function handleMessage(message) {
  const task = consumeMessage(message);
  currentTasks.add(task);
  task.then(
    () => currentTasks.delete(task),
    () => currentTasks.delete(task),
  );
}

async function waitForCurrentTasks() {
  await Promise.allSettled([...currentTasks]);
}

async function waitForConnectionClose(activeConnection) {
  await new Promise((resolve) => {
    activeConnection.once('close', resolve);
  });
}

async function connectAndConsume() {
  const activeConnection = await amqp.connect(rabbitMqUrl);
  const activeChannel = await activeConnection.createChannel();

  await activeChannel.assertQueue(queueName, { durable: true });
  await activeChannel.prefetch(1);

  const consumer = await activeChannel.consume(queueName, handleMessage, {
    noAck: false,
  });

  connection = activeConnection;
  channel = activeChannel;
  consumerTag = consumer.consumerTag;

  console.log(`RabbitMQ consumer is listening on ${queueName}`);
  return activeConnection;
}

async function runConsumer() {
  while (!isShuttingDown) {
    try {
      const activeConnection = await connectAndConsume();
      await waitForConnectionClose(activeConnection);
    } catch (error) {
      if (!isShuttingDown) {
        console.error(
          'RabbitMQ is unavailable, retrying connection:',
          error.message,
        );
      }
    } finally {
      connection = undefined;
      channel = undefined;
      consumerTag = undefined;
    }

    if (!isShuttingDown) {
      await delay(retryDelayMs);
    }
  }
}

export function startRabbitMqConsumer() {
  if (!startPromise) {
    startPromise = runConsumer();
  }

  return startPromise;
}

export function shutdownRabbitMqConsumer() {
  if (shutdownPromise) {
    return shutdownPromise;
  }

  shutdownPromise = (async () => {
    isShuttingDown = true;

    try {
      if (channel && consumerTag) {
        await channel.cancel(consumerTag);
      }

      await waitForCurrentTasks();

      if (channel) {
        await channel.close();
      }

      if (connection) {
        await connection.close();
      }

      console.log('RabbitMQ graceful shutdown completed');
    } catch (error) {
      console.error('RabbitMQ shutdown error:', error);
    }
  })();

  return shutdownPromise;
}
