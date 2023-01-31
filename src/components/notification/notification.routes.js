import AuthentificationMiddleware from "../security/middleware/authentification.middleware.js";
import NotificationController from "./controller/notification.controller.js";

const slug = "/notification/";

export default {
    'create': {
        path: slug + 'create',
        method: 'post',
        controller: NotificationController.create,
        roles: ['ROLE_USER'],
        middlewares: [AuthentificationMiddleware]
    },
    'notification_list': {
        path: slug,
        method: 'get',
        controller: NotificationController.list,
        roles: ['ROLE_USER'],
        middlewares: [AuthentificationMiddleware]
    },
    'notification_get': {
        path: slug + ':id',
        method: 'get',
        controller: NotificationController.get,
        roles: ['ROLE_USER'],
        middlewares: [AuthentificationMiddleware]
    }
};
