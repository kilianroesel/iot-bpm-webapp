import "dotenv/config";
import './config/mongoClient';
import express from "express";
import domainRouter from "./routes/domain/domainRouter";
import rulesRouter from "./routes/rulesRouter";
import { appConfig } from "./config/appConfig";
import { WebSocketTopicServer } from "./webSocketTopicServer";
import { KafkaConsumer } from "./config/kafkaClient";
import cors from "cors";
import { errorHandler } from "./middleware/errorhandling";

const port = appConfig.port;
const host = appConfig.host;
const app = express();
const topics = ["event-abstraction-rules"];
const kafkaConsumer = new KafkaConsumer(topics);
const webSocketTopicServer = new WebSocketTopicServer(topics);

kafkaConsumer.on("message", (topic: string, message: any) => {
    webSocketTopicServer.sendMessageToTopic(topic, message);
});

app.use(cors(appConfig.corsOptions));
app.use(express.json());
app.use("/domain", domainRouter);
app.use("/rules", rulesRouter);

app.use(errorHandler);

const server = app.listen(port, host, async () => {
    console.log(`Server is running on port ${port} and host ${host}`);
    // await kafkaConsumer.connectConsumer();
});

server.on("upgrade", (request, socket, head) => {
    webSocketTopicServer.handleUpgrade(request, socket as any, head);
});

function exitHandler(signal: any) {
    server.close(async () => {
        try {
            process.exit(0)
        } catch (err) {
            process.exit(1);
        }
    });
}

process.on("SIGTERM", exitHandler);
process.on("SIGINT", exitHandler);
process.on('SIGUSR2', exitHandler)
