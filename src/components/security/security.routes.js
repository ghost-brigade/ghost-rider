import LoginController from "./controller/login.controller.js";
import RegisterController from "./controller/register.controller.js";

const slug = "/";

export default {
  'security_register': {
    path: slug + 'register',
    method: 'post',
    controller: RegisterController.register,
    auth: false,
    roles: []
  },
  'security_login': {
    path: slug + 'login',
    method: 'post',
    controller: LoginController.login,
    auth: false,
    roles: []
  }
};
