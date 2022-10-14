import UserController from "./controller/user.controller.js";

const slug = "/user/";

export default {
  'user_list': {
    path: slug,
    method: 'get',
    controller: UserController.list,
    auth: true,
    roles: ['ROLE_USER']
  },
  'user_get': {
    path: slug + ':id',
    method: 'post',
    controller: UserController.get,
    auth: true,
    roles: ['ROLE_USER']
  }
};
