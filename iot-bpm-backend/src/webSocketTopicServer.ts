import { IncomingMessage } from "http";
import { EventEmitter } from "stream";
import WebSocket, { WebSocketServer } from "ws";

export class WebSocketTopicServer extends EventEmitter {
  private wsServer: WebSocketServer;
  private availableTopics: string[];
  private topicMap: Map<string, Set<WebSocket>>;

  constructor(availableTopics: string[]) {
    super();
    this.wsServer = new WebSocketServer({ noServer: true });
    this.availableTopics = availableTopics;
    this.topicMap = new Map();

    this.wsServer.on("connection", (ws: WebSocket, req: IncomingMessage) => {
      if (!req.url) {
        ws.close(1008, "Specify a topic");
        return;
      }

      const topic = req.url.split("?")[0].slice(1);
      if (!this.availableTopics.includes(topic)) {
        ws.close(1008, "Topic does not exist");
        return;
      }

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
    });
  }

  public handleUpgrade(request: IncomingMessage, socket: any, head: Buffer) {
    this.wsServer.handleUpgrade(request, socket, head, (ws) => {
      this.wsServer.emit("connection", ws, request);
    });
  }

  public sendMessageToTopic(topic: string, message: string) {
    if (!this.availableTopics.includes(topic)) {
      throw new Error("Topic is not available");
    }
    const clients = this.topicMap.get(topic);
    if (clients == null) {
      return;
    }
    clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  }
}
