import { Consumer, Kafka } from "kafkajs";
import EventEmitter from "events";

const kafkaClientId = process.env.KAFKA_CLIENTID || "";
const kafkaBroker = process.env.KAFKA_BROKER || "";
const kafkaUsername = process.env.KAFKA_USERNAME || "";
const kafkaPassword = process.env.KAFKA_PASSWORD || "";

export class KafkaConsumer extends EventEmitter {
  private kafka: Kafka;
  private consumer: Consumer;
  private topics: string[];

  constructor(topics: string[]) {
    super();
    this.kafka = new Kafka({
      clientId: kafkaClientId,
      brokers: [kafkaBroker],
      ssl: true,
      sasl: {
        mechanism: "plain",
        username: kafkaUsername,
        password: kafkaPassword,
      },
    });
    this.consumer = this.kafka.consumer({ groupId: "$Default" });
    this.topics = topics;
  }

  async connectConsumer() {
    await this.consumer.connect();
    await this.consumer.subscribe({ topics: this.topics, fromBeginning: true });

    this.consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        this.emit("message", topic, message.value?.toString());
      },
    });
  }
}
