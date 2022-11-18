import Controller from "../../../common/controller/controller.js";
import * as Response from "../../../common/service/http/response.js";
import ChannelRepository from "../repository/channel.repository.js";

class ChannelController extends Controller {

  constructor() {
    super();
    this.repository = new ChannelRepository();
  }

  /**
   * Return all channels
   * @param {Object} req
   * @param {Object} res
   * @returns {Promise<*>}
   */
  findAll = async (req, res) => {
    const channels = await this.repository.findAll();
    return Response.ok(req, res, channels);
  };

  /**
   * Return a channel
   * @param {Object} req
   * @param {Object} res
   * @returns {Promise<*>}
   */
  find = async (req, res) => {
    if (!req.params.id) {
      return Response.badRequest(req, res, "Missing channel id");
    }

    const id = parseInt(req.params.id);

    const channel = await this.repository.find(id);
    if (channel === null) {
      return Response.notFound(req, res, "Channel not found");
    }

    return Response.ok(req, res, channel);
  };

  /**
   * Create a channel
   * @param req
   * @param res
   * @returns {Promise<*|ArrayBuffer|ArrayBuffer|null|Blob|undefined>}
   */
  create = async (req, res) => {
    if (req.body === undefined || req.body.name === undefined || req.body.limit === undefined) {
      return Response.unprocessableEntity(req, res, "Missing parameters");
    }

    if (Number.isInteger(req.body.limit) === false) {
      return Response.unprocessableEntity(req, res, "Limit must be a number");
    }

    const {name, limit} = req.body;

    try {
      const channel = await this.repository.create({name, limit});
      return Response.created(req, res, channel);
    } catch (e) {
      return Response.internalServerError(req, res, e.message);
    }
  };

  /**
   * Update a channel
   * @param req
   * @param res
   * @returns {Promise<void>}
   */
  update = async (req, res) => {
    if (!req.params.id) {
      return Response.badRequest(req, res, "Missing channel id");
    }

    const id = parseInt(req.params.id);

    if (req.body === undefined) {
      return Response.unprocessableEntity(req, res, "Body is missing");
    }

    if (req.body.name === undefined && req.body.limit === undefined) {
      return Response.unprocessableEntity(req, res, "Missing parameters");
    }

    if (req.body.name !== undefined && req.body.name.length === 0) {
      return Response.unprocessableEntity(req, res, "Name is empty");
    }

    if (req.body.limit !== undefined && Number.isInteger(req.body.limit) === false) {
      return Response.unprocessableEntity(req, res, "Limit must be a number");
    }

    const channel = await this.repository.find(id);
    if (channel === null) {
      return Response.notFound(req, res, "Channel not found");
    }

    try {
      const updatedChannel = await this.repository.update(id,{name: req.body.name, limit: req.body.limit});
      return Response.ok(req, res, updatedChannel);
    } catch (e) {
      return Response.internalServerError(req, res, e.message);
    }
  };
}

export default new ChannelController;
