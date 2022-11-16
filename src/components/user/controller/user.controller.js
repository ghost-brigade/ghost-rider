import * as Response from "../../../common/service/Http/Response.js";
import UserRepository from "../repository/user.repository.js";
import Controller from "../../../common/controller/controller.js";

class UserController extends Controller {

  constructor() {
    super();
    this.userRepository = new UserRepository();
  }
  /**
   * Find all users
   * @param {Request} req
   * @param {Response} res
   * @returns {Promise<*>}
   */
  list = async (req, res) => {
    try {
      const users = await this.userRepository.findAll();

      return Response.ok(req, res, users);
    } catch (err) {
      return Response.error(req, res, err.message);
    }
  };

  /**
   * Find one user
   * @param {Request} req
   * @param {Response} res
   * @returns {Promise<*>}
   */
  get = async (req, res) => {
    if (req.params === undefined || req.params.id === undefined) {
      return Response.unprocessableEntity(req, res, "Missing parameters");
    }

    try {
      const user = await this.userRepository.find(parseInt(req.params.id));

      return Response.ok(req, res, user);
    } catch (err) {
      return Response.notFound(req, res, 'User not found');
    }
  };
}

export default new UserController();
