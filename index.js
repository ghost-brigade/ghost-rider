import Framework from "./src/infrastructure/Framework.js";

const framework = new Framework({});
framework.start();

const httpServer = framework.listen();

process.on(process.env.SIGNAL, () => {
    if (httpServer) {
        httpServer.close(() => {
            console.log('HTTP server closed');
            return framework.stop();
        });
    }
});
