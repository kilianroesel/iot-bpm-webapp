import wtfnode from "wtfnode";
import "dotenv/config";
import "./config/loggers";
import "./config/DbClient";
import express from "express";
import domainRouter from "./routes/domain/domainRouter";
import { appConfig } from "./config/appConfig";
import { WebSocketTopicServer } from "./webSocketTopicServer";
import { KafkaClient } from "./config/kafkaClient";
import cors from "cors";
import { errorHandler } from "./middleware/errorhandling";
import { logging } from "./middleware/logging";
import winston from "winston";
import { router as eventRouter } from "./routes/bpm/eventRouter";
import { DbClient } from "./config/DbClient";
import http from "http";

const logger = winston.loggers.get("systemLogger");
const port = appConfig.port;
const host = appConfig.host;
const app = express();
const dbClient = DbClient.instance;
const kafkaClient = KafkaClient.instance;
const webSocketTopicServer = new WebSocketTopicServer();

// const kafkaClient = new KafkaClient(topics);

// kafkaClient.on("message", (_: string, message: any) => {
//     if (message.schemaVersion == "1.0" && message.payloadType == "csi:1.0") {
//         if (message.payload.edgeDeviceId) {
//             webSocketTopicServer.sendMessageToTopic("devices/" + message.payload.edgeDeviceId, message);
//         }
//     }
// });

app.use(cors(appConfig.corsOptions));
app.use(logging);
app.use(express.json());

app.use("/domain", domainRouter);
app.use("/events", eventRouter);

app.use(errorHandler);

const server = http.createServer(app);

server.on("upgrade", (request, socket, head) => {
    webSocketTopicServer.handleUpgrade(request, socket as any, head);
});

async function startup() {
    await dbClient.connect();
    await kafkaClient.connect();
    server.listen(port, () => {
        logger.info(`Server running on port ${port}`);
    });
}

async function exitHandler() {
    server.close();
    await dbClient.close();
    await kafkaClient.disconnect();
    logger.info("Application has shut down");
}

process.on("SIGTERM", exitHandler);
process.on("SIGINT", exitHandler);
process.on("SIGUSR2", exitHandler);

startup();
