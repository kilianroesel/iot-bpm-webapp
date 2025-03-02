import { Consumer, Kafka } from "kafkajs";
import EventEmitter from "events";
import winston from "winston";

const kafkaClientId = process.env.KAFKA_CLIENTID || "";
const kafkaBroker = process.env.KAFKA_BROKER || "";
const kafkaUsername = process.env.KAFKA_USERNAME || "";
const kafkaPassword = process.env.KAFKA_PASSWORD || "";


const logger = winston.loggers.get("systemLogger");
export class KafkaClient extends EventEmitter {
    static #instance: KafkaClient;
    private kafka: Kafka;
    private consumer: Consumer;
    private topics: string[];

    private constructor(topics: string[]) {
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
        this.consumer = this.kafka.consumer({ groupId: "iot-bpm-webapp" });
        this.topics = topics;
    }

    public static get instance(): KafkaClient {
        const topics = ["eh-bpm-event-processing-prod"];

        if (!KafkaClient.#instance) {
            KafkaClient.#instance = new KafkaClient(topics);
        }
        return KafkaClient.#instance;
    }

    async connect() {
        await this.consumer.connect();
        await this.consumer.subscribe({ topics: this.topics, fromBeginning: false });
        await this.consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                if (message.value)
                    try {
                        const jsonMessage = JSON.parse(message.value.toString());
                        this.emit("message", topic, jsonMessage);
                    } catch (error) {
                    }
            },
        });
    }

    async disconnect() {
        await this.consumer.disconnect();
    }
}
