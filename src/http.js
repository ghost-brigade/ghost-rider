import http from "http";
import express from "express";
import process from "node:process";
import cors from "cors";
import router from "./routes.js";

class Http {

  #middlewares = [
    cors(),
    express.json()
  ];

  constructor() {
    this.app = express();
    this.httpServer = http.createServer(this.app);
  }

  async start() {
    this.app.disable('x-powered-by');
    this.app.use(this.#middlewares);
    this.app.use(router);
  }

  addMiddleware(fn) {
    if (typeof fn !== 'function') {
      throw new Error('Middleware must be a function ' + typeof fn + ' provided');
    }

    this.#middlewares.push(fn);
    return this;
  }

  listen() {
    return this.httpServer.listen(process.env.PORT, () => {
      console.log('Server listening on port ' + process.env.PORT);
    });
  }

  getInstance() {
    return this.app;
  }
}

export default Http;
