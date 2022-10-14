import * as Response from "../../../common/service/Http/Response.js";
import Controller from "../../../common/controller/controller.js";
import AuthentificatorService from "../service/security/authentificator.service.js";

class LoginController extends Controller {

  /**
   * Authenticate a user
   * @param {Request} req
   * @param {Response} res
   * @returns {Promise<*>}
   */
  login = async (req, res) => {
        if (req.body === undefined || req.body.email === undefined || req.body.password === undefined) {
            return Response.unprocessableEntity(req, res, "Missing parameters");
        }

        try {
            const jwtToken = await AuthentificatorService.authenticate(req.body.email, req.body.password);

            return Response.ok(req, res, {'token': jwtToken});
        } catch (err) {
            return Response.unauthorized(req, res, err.message);
        }
    };

}

export default new LoginController();
