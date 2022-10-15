import * as Response from "../../../common/service/Http/Response.js";
import UserRepository from "../../user/repository/user.repository.js";
import TokenService from "../service/jwt/token.service.js";

/**
 * Middleware to check if the user is authenticated
 * @param {Request} req
 * @param {Response} res
 * @param {Function} next
 * @returns {Promise<*>}
 */
const AuthentificationMiddleware = async (req, res, next) => {
    const header = req.headers.authorization;

    if (!header) {
        return Response.unauthorized(req, res, "No token provided");
    }

    const [type, token] = header.split(/\s+/);

    if (type !== "Bearer") {
        return Response.unauthorized(req, res, "Invalid token type");
    }

    const tokenService = new TokenService();
    const user = await tokenService.validate(token);

    if (user) {
        try {
            const userRepository = new UserRepository();
            req.user = await userRepository.find(user.id);
            next();
        } catch (err) {
            Response.forbidden(req, res);
        }
    } else {
        return Response.unauthorized(req, res, "Invalid token");
    }
};

export default AuthentificationMiddleware;
