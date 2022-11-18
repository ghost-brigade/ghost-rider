import ChannelController from "./controller/channel.controller.js";
import AuthentificationMiddleware from "../security/middleware/authentification.middleware.js";

const slug = "/channel";

export default {
  'channel_get_collection': {
    path: slug ,
    method: 'get',
    controller: ChannelController.findAll,
    roles: [AuthentificationMiddleware],
  },
  'channel_get_item': {
    path: slug + '/:id',
    method: 'get',
    controller: ChannelController.find,
    roles: [AuthentificationMiddleware],
  },
  'channel_post_collection': {
    path: slug,
    method: 'post',
    controller: ChannelController.create,
    roles: [AuthentificationMiddleware],
  },
  'channel_put_item': {
    path: slug + '/:id',
    method: 'post',
    controller: ChannelController.update,
    roles: [AuthentificationMiddleware],
  }
};
