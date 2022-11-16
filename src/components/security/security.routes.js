import LoginController from "./controller/login.controller.js";
import RegisterController from "./controller/register.controller.js";
import AntispamMiddleware from "./middleware/antispam.middleware.js";
import passwordRequestController from "./controller/passwordRequest.controller.js";
import changePasswordController from "./controller/changePassword.controller.js";

const slug = "/";

export default {
  'security_register_confirm': {
    path: slug + 'register/confirm',
    method: 'post',
    controller: RegisterController.confirm,
    roles: [],
  },
  'security_register': {
    path: slug + 'register',
    method: 'post',
    controller: RegisterController.register,
    roles: [],
  },
  'security_login': {
    path: slug + 'login',
    method: 'post',
    controller: LoginController.login,
    roles: [],
    middlewares: [AntispamMiddleware]
  },
  'security_reset_password_request': {
    path: slug + 'reset-password/request',
    method: 'post',
    controller: passwordRequestController.request,
    roles: [],
    middlewares: [AntispamMiddleware]
  },
  'security_reset_password': {
    path: slug + 'reset-password',
    method: 'post',
    controller: changePasswordController.changePassword,
    roles: [],
    middlewares: [AntispamMiddleware]
  }
};
