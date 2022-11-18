import {Server} from "socket.io";

class SocketService {
  #io;

  init(httpServer = 9000) {
    this.#io = new Server(httpServer, {
      cors: {
        origin: "*",
      }
    });
  }

  get io() {
    return this.#io;
  }
}

export default new SocketService();
