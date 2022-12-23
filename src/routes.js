import express from "express";
import cors from "cors";
import * as Response from "./common/service/Http/Response.js";
import RouterService from "./common/service/router/router.service.js";
import {dirname} from "path";
import * as path from "path";
import NotificationEvent from "./components/notification/event/notification.event.js";

const router = express.Router();
const routerService = new RouterService().init();

router.use(express.json());
router.use(cors({'origin': true, 'credentials': true}));

await routerService.then((routes) => {
  if (process.env.NODE_ENV === 'dev') { console.log('\n====== ROUTER DEBUG ======'); }
  for (let [key, route] of Object.entries(routes)) {
    key;
    router[route.method](route.path, route.middlewares, route.controller);
    if (process.env.NODE_ENV === 'dev') { console.log(`Route ${route.method.toUpperCase()} ${route.path} loaded`); }
  }
  if (process.env.NODE_ENV === 'dev') { console.log('======== ====== ========\n'); }
});

router.get('/notifications/sse', (req, res) => {

  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders(); // flush the headers to establish SSE with client


  NotificationEvent.on('create', async (event) => {

    res.write(`data: ${JSON.stringify({event})}\n\n`);

  });

  res.on('close', () => {
    console.log('client dropped me');
    res.end();
  });
});

router.get('/stream', function (req, res) {
  res.sendFile(path.resolve(dirname(import.meta.url).replace('file://', ''), '..', 'sse.test.html'));
});

router.use('*', async (req, res) => {
  return Response.notFound(req, res, "Page not found");
});

export default router;

