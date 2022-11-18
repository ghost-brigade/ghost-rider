import Express from "./src/http.js";
import config from "./config.js";
import SocketService from "./src/common/service/Socket/socket.service.js";

config.env();

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
