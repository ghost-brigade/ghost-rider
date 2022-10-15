import express from "express";
import cors from "cors";
import * as Response from "./common/service/Http/Response.js";
import RouterService from "./common/service/router/router.service.js";

const router = express.Router();
const routerService = new RouterService().init();

router.use(express.json());
router.use(cors({'origin': true, 'credentials': true}));

await routerService.then((routes) => {
  for (let [key, route] of Object.entries(routes)) {
    key;
    router[route.method](route.path, route.middlewares, route.controller);
    //console.log(`Route ${route.method.toUpperCase()} ${route.path} loaded`);
  }
});

router.use('*', async (req, res) => {
    return Response.notFound(req, res, "Page not found");
});

export default router;

