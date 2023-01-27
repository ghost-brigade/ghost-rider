import * as Response from "../../../common/service/Http/Response.js";
import Controller from "../../../common/controller/controller.js";
import AuthentificatorService from "../service/security/authentificator.service.js";

class LoginController extends Controller {

  constructor(props) {
    super(props);
    this.authentificatorService = new AuthentificatorService();
  }

  /**
   * Get current user
   * @param {Request} req
   * @param {Response} res
   * @returns {Promise<*>}
   */
  current = async (req, res) => {
    if (req.user) {
        return Response.ok(req, res, {
          'id': req.user.id,
          'firstname': req.user.firstname,
          'lastname': req.user.lastname,
          'email': req.user.email,
          'roles': req.user.roles,
        });
    } else {
        return Response.notFound(req, res, 'Not connected');
    }
  };

}

export default new LoginController();
