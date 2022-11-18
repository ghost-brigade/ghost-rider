import Controller from "../../../common/controller/controller.js";
import * as Response from "../../../common/service/Http/response.js";
import ChannelRepository from "../../channel/repository/channel.repository.js";
import MessageService from "../service/message.service.js";

class MessageController extends Controller {

  /**
   * @param {Object} req
   * @param {Object} res
   * @returns {Promise<void>}
   */
  async add(req, res) {
    if (req.body === undefined || req.body.channelId === undefined || req.body.message === undefined) {
      return Response.unprocessableEntity(req, res, "Missing parameters");
    }

    const {channelId, message} = req.body;

    const channelRepository = new ChannelRepository();
    const channel = await channelRepository.find(channelId);

    if (channel === null) {
      return Response.notFound(req, res, "Channel not found");
    }

    try {
      const messageService = new MessageService();
      const newMessage = await messageService.add({message, channelId, user: req.user});
      return Response.created(req, res, newMessage);
    } catch (e) {
      return Response.internalServerError(req, res, e.message);
    }
  }
}

export default new MessageController;
