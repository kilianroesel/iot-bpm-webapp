import "dotenv/config";
import "./config/loggers";
import "./config/mongoClient";
import express from "express";
import domainRouter from "./routes/domain/domainRouter";
import { appConfig } from "./config/appConfig";
import { WebSocketSubscriptionServer } from "./webSocketTopicServer";
import { KafkaClient } from "./config/kafkaClient";
import cors from "cors";
import { errorHandler } from "./middleware/errorhandling";
import { logging } from "./middleware/logging";
import winston from "winston";
import { router as bpmRouter } from "./routes/bpm/lineRouter";
import { DbClient } from "./config/mongoClient";
import http from "http";

const logger = winston.loggers.get("systemLogger");
const port = appConfig.port;
const app = express();
const dbClient = DbClient.instance;
const kafkaClient = KafkaClient.instance;
const webSocketTopicServer = WebSocketSubscriptionServer.instance;

kafkaClient.on("message", (topic: string, message: any) => {
    switch (topic) {
        case "eh-bpm-event-processing-prod":
            if (message.schemaVersion == "1.0" && message.payloadType == "csi:1.0") {
                if (message.payload.edgeDeviceId) {
                    webSocketTopicServer.sendMessageToEndpoint("bpm/lines/" + message.payload.edgeDeviceId + "/messages", message);
                }
            }
            break;
        case "eh-bpm-ocelevents-prod":
            webSocketTopicServer.sendMessageToEndpoint("bpm/lines/" + message.device + "/events", message.document);
            break;
    }
});

app.use(cors(appConfig.corsOptions));
app.use(logging);
app.use(express.json());

app.use("/domain", domainRouter);
app.use("/bpm", bpmRouter);

app.use(errorHandler);

const server = http.createServer(app);
server.on("upgrade", (request, socket, head) => {
    webSocketTopicServer.handleUpgrade(request, socket as any, head);
});

async function startup() {
    try {
        await dbClient.connect();               // Connect database
        logger.info("Connected database");
        // await kafkaClient.connect();            // Connect kafka client
        logger.info("Connected kafka");
        server.listen(port, () => {             // Finally start listening for connections
            logger.info(`Server running on port ${port}`);
        });
    } catch (error) {
        logger.error("Could not start application")
    }
}

async function shutdown() {
    logger.info("Shutting down application");
    try {
        server.close();                               // Stop accepting new connections
        logger.info("Closed server");
        await webSocketTopicServer.close();           // Close websocket connections
        logger.info("Closed websocket");
        await dbClient.close();
        logger.info("Closed database");
        await kafkaClient.disconnect();
        logger.info("Disconnected kafka");
        logger.info("Application has shut down");
    } catch (error) {
        logger.error("Application shut down with errors");
        process.exit(1);
    }
    process.exit(0);
}

process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);
process.on("SIGUSR2", shutdown);

startup();
