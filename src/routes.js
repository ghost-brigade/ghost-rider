import express from "express";
import cors from "cors";
import * as Response from "./common/service/Http/Response.js";
import RouterService from "./common/service/router/router.service.js";
import AuthentificationMiddleware from "./components/security/middleware/authentification.middleware.js";
const router = express.Router();

router.use(express.json());
router.use(cors({'origin': true, 'credentials': true}));

await RouterService.init().then((routes) => {
  for (let [key, route] of Object.entries(routes)) {
    key;
    if (route.auth) {
      router[route.method](route.path, AuthentificationMiddleware, route.controller);
    } else {
      router[route.method](route.path, route.controller);
    }
  }
});

router.use('*', async (req, res) => {
    return Response.notFound(req, res, "Page not found");
});

export default router;

