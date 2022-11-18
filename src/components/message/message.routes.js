import AuthentificationMiddleware from "../security/middleware/authentification.middleware.js";
import MessageController from "./controller/message.controller.js";

const slug = "/message";

export default {
  'message_add': {
    path: slug,
    method: 'post',
    controller: MessageController.add,
    roles: [],
    middlewares: [AuthentificationMiddleware]
  }
};
