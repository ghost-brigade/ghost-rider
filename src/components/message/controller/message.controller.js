import Controller from "../../../common/controller/controller.js";
import * as Response from "../../../common/service/Http/response.js";
import MessageService from "../service/message.service.js";
import MessageRepository from "../repository/message.repository.js";
import ChannelRepository from "../../channel/repository/channel.repository.js";
import SocketService from "../../../common/service/Socket/socket.service.js";

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

      SocketService.io.to('channel:' + channelId).emit('message:new', newMessage);

      return Response.created(req, res, {
        id: newMessage.id,
        message: newMessage.message,
        user: "/user/" + newMessage.userId,
        channel: "/channel/" + newMessage.channelId,
        createdAt: newMessage.createdAt,
        updatedAt: newMessage.updatedAt
      });
    } catch (e) {
      return Response.internalServerError(req, res, e.message);
    }
  }

  async list(req, res) {
    if (req.params === undefined || req.params.channelId === undefined) {
      return Response.unprocessableEntity(req, res, "Missing channelId parameter");
    }

    const {channelId} = Number.parseInt(req.params.channelId);

    const messageRepository = new MessageRepository();
    const messages = await messageRepository.findAllByChannelId(channelId);

    return Response.ok(req, res, messages.map(message => {
      return {
        id: message.id,
        message: message.message,
        user: "/user/" + message.userId,
        channel: "/channel/" + message.channelId,
      };
    }));
  }
}

export default new MessageController;
