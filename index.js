import Express from "./src/http.js";
import config from "./config.js";

config.env();

Express.start();
const httpServer = Express.listen();

process.on(process.env.SIGNAL, () => {
    if (httpServer) {
        httpServer.close(() => {
            console.log('HTTP server closed');
            return httpServer.stop();
        });
    }
});
