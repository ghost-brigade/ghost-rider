import UserController from "./controller/user.controller.js";
import AuthentificationMiddleware from "../security/middleware/authentification.middleware.js";

const slug = "/user/";

export default {
  'user_list': {
    path: slug,
    method: 'get',
    controller: UserController.list,
    auth: true,
    roles: ['ROLE_USER'],
    middlewares: [AuthentificationMiddleware]
  },
  'user_get': {
    path: slug + ':id',
    method: 'get',
    controller: UserController.get,
    roles: ['ROLE_USER'],
    middlewares: [AuthentificationMiddleware]
  }
};
