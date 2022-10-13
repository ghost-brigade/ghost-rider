import express from "express";
import cors from "cors";
import userRouter from "./components/user/index.routes.js";
import * as Response from "./common/service/Http/Response.js";

const router = express.Router();

router.use(express.json());
router.use(cors({'origin': true, 'credentials': true}));

router.use(userRouter);

router.get('*', async (req, res) => {
    return Response.notFound(req, res, "Page not found");
});

export default router;
