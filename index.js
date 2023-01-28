import Express from "./src/http.js";
import config from "./config.js";
import SocketService from "./src/common/service/Socket/socket.service.js";
import * as Sentry from "@sentry/node";

config.env();

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 1.0,
});

try {
  const events = await import("./src/common/events.js");
  events.default.register();

  const ExpressServer = new Express();
  ExpressServer.start();

  const httpServer = ExpressServer.listen();

  SocketService.init(ExpressServer.httpServer);

  const sockets = await import("./src/common/sockets.js");
  sockets.default.register();

  process.on(process.env.SIGNAL, () => {
    if (httpServer) {
      httpServer.close(() => {
        console.log('HTTP server closed');
        return httpServer.stop();
      });
    }
  });
} catch (error) {
  Sentry.captureException(error);
  console.error(error);
}
