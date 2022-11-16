import Express from "./src/http.js";
import config from "./config.js";

config.env();

const events = await import("./src/common/events.js");
events.default.register();

const ExpressServer = new Express();
ExpressServer.start();
const httpServer = ExpressServer.listen();

process.on(process.env.SIGNAL, () => {
    if (httpServer) {
        httpServer.close(() => {
            console.log('HTTP server closed');
            return httpServer.stop();
        });
    }
});
