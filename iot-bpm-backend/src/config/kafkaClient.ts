import { Kafka } from 'kafkajs';
import wss from '../webSocketServer';

const kafkaClientId = process.env.KAFKA_CLIENTID || "";
const kafkaBroker = process.env.KAFKA_BROKER || "";
const kafkaUsername = process.env.KAFKA_USERNAME || "";
const kafkaPassword = process.env.KAFKA_PASSWORD || "";
const kafkaTopic = process.env.KAFKA_TOPIC || "";

const kafka = new Kafka({
  clientId: kafkaClientId,
  brokers: [kafkaBroker],
  ssl: true,
  sasl: {
    mechanism: 'plain',
    username: kafkaUsername,
    password: kafkaPassword
  }
});

const producer = kafka.producer();
const consumer = kafka.consumer({ groupId: 'express-group' });

const connectProducer = async () => {
  await producer.connect();
};

const connectConsumer = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: kafkaTopic, fromBeginning: true });

  consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(message.value?.toString() || "Undefined");
        }
      });
    },
  });
};

export { producer, connectProducer, connectConsumer };
