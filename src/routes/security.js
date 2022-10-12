import express from "express";
import * as SecurityController from "../controller/SecurityController.js";

const router = express.Router();

// router.post('/login', SecurityController.login);
router.post('/register', SecurityController.register);

export default router;