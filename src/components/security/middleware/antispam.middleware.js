import * as Response from "../../../common/service/Http/Response.js";
import AntispamService from "../service/antispam/antispam.service.js";

/**
 * Middleware to check if the user is not spamming
 * @param {Request} req
 * @param {Response} res
 * @param {Function} next
 * @returns {Promise<*>}
 */
const AntispamMiddleware = async (req, res, next) => {
  const antispamService = new AntispamService();

  try {
    await antispamService.authorizeAuthenticationRequest(req.ip, req.body.email);
    next();
  } catch (err) {
    return Response.forbidden(req, res, 'You are banned please retry later');
  }
};

export default AntispamMiddleware;
