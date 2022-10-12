// import Framework from "./src/infrastructure/Framework.js";

// const framework = new Framework({});
// framework.start();

// const httpServer = framework.listen();

// process.on(process.env.SIGNAL, () => {
//     if (httpServer) {
//         httpServer.close(() => {
//             console.log('HTTP server closed');
//             return framework.stop();
//         });
//     }
// });

import express from "express";
import Router from "./src/routes/index.js";
import init from "./config.js";

init();

const app = express();
const port = process.env.PORT;

app.use(Router);

// server.listen(port, () => console.log(`Server Connected to port ${port}`));

app.get("/", async (req, res) => {
    res.send("Hello World!");
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
