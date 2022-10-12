import express from "express";
import UserController from "./controller/UserController.js";
import UserLoginController from "./controller/UserLoginController.js";
import UserRegisterController from "./controller/UserRegisterController.js";

const router = express.Router();
const slug = '/user';

router.get(slug + '/', UserController.list);
router.get(slug + '/:id', UserController.get);

router.get('/register', UserRegisterController.register);
router.get('/login', UserLoginController.login);

export default router;
