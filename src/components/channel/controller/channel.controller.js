import Controller from "../../../common/controller/controller.js";
import * as Response from "../../../common/service/http/response.js";

class ChannelController extends Controller {

  /**
   * Return all channels
   * @param {Object} req
   * @param {Object} res
   * @returns {Promise<*>}
   */
  findAll = async (req, res) => {
    const channels = await this.repository.findAll();
    return Response.ok(res, channels);
  };

  /**
   * Return a channel
   * @param {Object} req
   * @param {Object} res
   * @returns {Promise<*>}
   */
  find = async (req, res) => {
    const channel = await this.repository.find(req.params.id);
    if (channel === null) {
      return Response.notFound(req, res, "Channel not found");
    }
    return Response.ok(res, channel);
  };
}

export default new ChannelController;
