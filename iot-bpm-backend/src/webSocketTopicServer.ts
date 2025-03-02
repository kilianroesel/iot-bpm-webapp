import { IncomingMessage } from "http";
import { EventEmitter } from "stream";
import WebSocket, { WebSocketServer } from "ws";

export class WebSocketTopicServer extends EventEmitter {
  private wsServer: WebSocketServer;
  private topicMap: Map<string, Set<WebSocket>>;

  constructor() {
    super();
    this.wsServer = new WebSocketServer({ noServer: true });
    this.topicMap = new Map();
  }

  private onConnection(ws: WebSocket, req: IncomingMessage) {
    if (!req.url) {
      ws.close(1008, "Specify a topic");
      return;
    }

    const topic = req.url.split("?")[0].slice(1);
    console.log(topic)
    var clients = this.topicMap.get(topic);
    if (clients == null) {
      clients = new Set();
    }
    clients.add(ws);
    this.topicMap.set(topic, clients);

    ws.on("close", () => {
      const clients = this.topicMap.get(topic);
      if (clients != null) {
        clients.delete(ws);
      }
    });
  }

  public handleUpgrade(request: IncomingMessage, socket: any, head: Buffer) {
    this.wsServer.handleUpgrade(request, socket, head, (ws) => {
      this.onConnection(ws, request);
    });
  }

  public sendMessageToTopic(topic: string, message: string) {
    const clients = this.topicMap.get(topic);
    if (clients == null) {
      return;
    }
    clients.forEach((client) => {
      console.log(client.readyState)
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  }
}
