import express from "express";
import UserController from "./controller/UserController.js";
import UserLoginController from "./controller/UserLoginController.js";
import UserRegisterController from "./controller/UserRegisterController.js";
import AuthentificationMiddleware from "../../common/middleware/AuthentificationMiddleware.js";

const router = express.Router();
const slug = '/user';

router.get(slug + '/', AuthentificationMiddleware, UserController.list);
router.get(slug + '/:id', AuthentificationMiddleware, UserController.get);

router.post('/register', UserRegisterController.register);
router.post('/login', UserLoginController.login);

export default router;
