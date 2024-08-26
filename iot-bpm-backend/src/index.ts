import 'dotenv/config';
import express from 'express';
import apiRouter from './apiRouter';
import { appConfig } from './config/appConfig';
import wsServer from './webSocketServer';
import { connectConsumer, connectProducer } from './config/kafkaClient';

const port = appConfig.port;
const host = appConfig.host;
const app = express();

app.use(express.json());
app.use('/api', apiRouter);

const server = app.listen(port, host, async () => {
  console.log(`Server is running on port ${port} and host ${host}`);
  await connectProducer();
  await connectConsumer();
});

server.on('upgrade', (request, socket, head) => {
  wsServer.handleUpgrade(request, socket as any, head, (ws) => {
    wsServer.emit('connection', ws, request);
  });
});