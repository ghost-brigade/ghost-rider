import ChannelController from "./controller/channel.controller.js";
import AuthentificationMiddleware from "../security/middleware/authentification.middleware.js";

const slug = "/channel";

export default {
  'channel_get_collection': {
    path: slug ,
    method: 'get',
    controller: ChannelController.findAll,
    roles: ['ROLE_USER'],
    middlewares: [AuthentificationMiddleware],
  },
  'channel_get_item': {
    path: slug + '/:id',
    method: 'get',
    controller: ChannelController.find,
    roles: ['ROLE_USER'],
    middlewares: [AuthentificationMiddleware],
  },
  'channel_post_collection': {
    path: slug,
    method: 'post',
    controller: ChannelController.create,
    roles: ['ROLE_ADMIN'],
    middlewares: [AuthentificationMiddleware],
  },
  'channel_connect_conseiller': {
    path: slug + '/conseiller/:id',
    method: 'get',
    controller: ChannelController.connectConseiller,
    roles: [],
    middlewares: [AuthentificationMiddleware]
  },
  'channel_put_item': {
    path: slug + '/:id',
    method: 'put',
    controller: ChannelController.update,
    roles: ['ROLE_ADMIN'],
    middlewares: [AuthentificationMiddleware],
  },
  'channel_delete_item': {
    path: slug + '/:id',
    method: 'delete',
    controller: ChannelController.delete,
    roles: ['ROLE_ADMIN'],
    middlewares: [AuthentificationMiddleware],
  }
};
