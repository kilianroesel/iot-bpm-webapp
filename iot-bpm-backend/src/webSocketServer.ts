import WebSocket, { WebSocketServer }  from "ws";

const wsServer = new WebSocketServer({ noServer: true });

wsServer.on('connection', (ws: WebSocket) => {
  console.log('WebSocket connection established');

  // Handle incoming messages if needed
  ws.on('message', (message) => {
    console.log(`Received message => ${message}`);
  });

  // Handle WebSocket close
  ws.on('close', () => {
    console.log('WebSocket connection closed');
  });
});

export default wsServer;