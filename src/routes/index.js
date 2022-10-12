import express from "express";
import cors from "cors";
import securityRouter from "./security.js";
import userRouter from "./user.js";
import * as Response from "../service/Http/Response.js";

const router = express.Router();

router.use(express.json());
router.use(cors({'origin': true, 'credentials': true}));

router.use(securityRouter);

router.use('/user', userRouter);

router.get('*', async (req, res) => {
    return Response.notFound(req, res, "Page not found");
});

export default router;