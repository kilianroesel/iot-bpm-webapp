import { Kafka } from 'kafkajs';
import { kafkaConfig } from '@/config/kafkaConfig';
import wss from '@/webSocketServer';

const kafka = new Kafka({
  clientId: kafkaConfig.kafkaClientId,
  brokers: [kafkaConfig.kafkaBroker],
  ssl: true,
  sasl: {
    mechanism: 'plain',
    username: kafkaConfig.kafkaUsername,
    password: kafkaConfig.kafkaPassword
  }
});

const producer = kafka.producer();
const consumer = kafka.consumer({ groupId: 'express-group' });

const connectProducer = async () => {
  await producer.connect();
};

const connectConsumer = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: kafkaConfig.kafkaTopic, fromBeginning: true });

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
