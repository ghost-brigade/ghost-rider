import * as Response from "../../../common/service/Http/Response.js";
import AntispamService from "../service/antispam/antispam.service.js";
import BannedException from "../exception/banned.exception.js";
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
    if (err instanceof BannedException) {
      return Response.unauthorized(req, res, err.message);
    }
    return Response.internalServerError(req, res, "Internal server error", err);
  }
};

export default AntispamMiddleware;
