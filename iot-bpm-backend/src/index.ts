import "dotenv/config";
import express from "express";
import domainRouter from "./routes/domainRouter";
import rulesRouter from "./routes/rulesRouter";
import { appConfig } from "./config/appConfig";
import wsServer from "./webSocketServer";
import { connectConsumer, connectProducer } from "./config/kafkaClient";
import "./config/mongoose";

const port = appConfig.port;
const host = appConfig.host;
const app = express();

app.use(express.json());
app.use("/domain", domainRouter);
app.use("/rules", rulesRouter);

const server = app.listen(port, host, async () => {
  console.log(`Server is running on port ${port} and host ${host}`);
  await connectProducer();
  await connectConsumer();
});

server.on("upgrade", (request, socket, head) => {
  wsServer.handleUpgrade(request, socket as any, head, (ws) => {
    wsServer.emit("connection", ws, request);
  });
});
