import * as Response from "../../../common/service/Http/Response.js";
import NotificationRepository from "../repository/notification.repository.js";
import Controller from "../../../common/controller/controller.js";
import notificationEvent from "../../notification/event/notification.event.js";
class NotificationController extends Controller {

  constructor() {
    super();
    this.notificationRepository = new NotificationRepository();
  }

  /**
  * Create a notification
  * @param {Request} req
  * @param {Response} res
  * @returns {Promise<*>}
  */
  create = async (req, res) => {

    if (req.body === undefined || req.body.message === undefined || req.body.type === undefined) {
      return Response.unprocessableEntity(req, res, req.body);
    }

    try {
      const notification = await this.notificationRepository.create(req.user, req.body.message);

      // res.sse('notification', { message: 'Nouvelle notification' });

      notification.type = req.body.type;

      notificationEvent.emit('create', {
        data: notification,
      });

      return Response.ok(req, res, notification);
    } catch (err) {
      return Response.error(req, res, err.message);
    }
  };

  /**
   * Find all notifications
   * @param {Request} req
   * @param {Response} res
   * @returns {Promise<*>}
   */
  list = async (req, res) => {
    try {
      const notifications = await this.notificationRepository.findAll();

      return Response.ok(req, res, notifications);
    } catch (err) {
      return Response.error(req, res, err.message);
    }
  };

  /**
  * Find one notification
  * @param {Request} req
  * @param {Response} res
  * @returns {Promise<*>}
  */
  get = async (req, res) => {
    if (req.params === undefined || req.params.id === undefined) {
      return Response.unprocessableEntity(req, res, "Missing parameters");
    }

    try {
      const notification = await this.notificationRepository.find(parseInt(req.params.id));

      return Response.ok(req, res, notification);
    } catch (err) {
      return Response.notFound(req, res, 'Notification not found');
    }
  };

}

export default new NotificationController();
