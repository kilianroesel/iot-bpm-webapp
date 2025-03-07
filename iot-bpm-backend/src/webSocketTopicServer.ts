import { IncomingMessage } from "http";
import { EventEmitter } from "stream";
import WebSocket, { WebSocketServer } from "ws";

export class WebSocketSubscriptionServer extends EventEmitter {
  static #instance: WebSocketSubscriptionServer;
  private wsServer: WebSocketServer;
  private endpointMap: Map<string, Set<WebSocket>>;

  private constructor() {
    super();
    this.wsServer = new WebSocketServer({ noServer: true });
    this.endpointMap = new Map();
  }

  public static get instance(): WebSocketSubscriptionServer {
    if (!WebSocketSubscriptionServer.#instance) {
        WebSocketSubscriptionServer.#instance = new WebSocketSubscriptionServer();
    }
    return WebSocketSubscriptionServer.#instance;
}

  private onConnection(ws: WebSocket, req: IncomingMessage) {
    if (!req.url) {
      ws.close(1008, "Specify an endpoint");
      return;
    }

    const endpoint = req.url.split("?")[0].slice(1);
    var clients = this.endpointMap.get(endpoint);
    if (clients == null) {
      clients = new Set();
    }
    clients.add(ws);
    this.endpointMap.set(endpoint, clients);

    ws.on("close", () => {
      const clients = this.endpointMap.get(endpoint);
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

  public sendMessageToEndpoint(endpoint: string, message: string) {
    const clients = this.endpointMap.get(endpoint);
    if (!clients) {
      return;
    }
    clients.forEach((client) => {
      if (client.readyState == WebSocket.OPEN) {
        client.send(JSON.stringify(message));
      }
    });
  }

  public async close() {
    this.endpointMap.forEach((clientSet) => {
      clientSet.forEach((client) => {
        client.close(1001, 'Application shutting down');
      })
    });
    this.wsServer.close();
  }
}
