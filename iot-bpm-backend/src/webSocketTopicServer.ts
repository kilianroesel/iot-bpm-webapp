import { IncomingMessage } from "http";
import { EventEmitter } from "stream";
import WebSocket, { WebSocketServer } from "ws";

export class WebSocketTopicServer extends EventEmitter {
  static #instance: WebSocketTopicServer;
  private wsServer: WebSocketServer;
  private topicMap: Map<string, Set<WebSocket>>;

  private constructor() {
    super();
    this.wsServer = new WebSocketServer({ noServer: true });
    this.topicMap = new Map();
  }

  public static get instance(): WebSocketTopicServer {
    if (!WebSocketTopicServer.#instance) {
        WebSocketTopicServer.#instance = new WebSocketTopicServer();
    }
    return WebSocketTopicServer.#instance;
}

  private onConnection(ws: WebSocket, req: IncomingMessage) {
    if (!req.url) {
      ws.close(1008, "Specify a topic");
      return;
    }

    const topic = req.url.split("?")[0].slice(1);
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
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  }

  public async close() {
    this.topicMap.forEach((clientSet) => {
      clientSet.forEach((client) => {
        client.close(1001, 'Application shutting down');
      })
    });
    this.wsServer.close();
  }
}
