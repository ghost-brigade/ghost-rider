import * as Response from "../../../common/service/Http/Response.js";
import UserRepository from "../../user/repository/user.repository.js";
import Controller from "../../../common/controller/controller.js";
import PasswordService from "../service/security/password.service.js";

class UserControllerRegister extends Controller {

  /**
   * Register a new user
   * @param {Request} req
   * @param {Response} res
   * @returns {Promise<*>}
   */
  register = async (req, res) => {
        if (req.body === undefined || req.body.email === undefined || req.body.password === undefined || req.body.name === undefined || req.body.firstname === undefined) {
            return Response.unprocessableEntity(req, res, "Missing parameters");
        }

        const passwordService = new PasswordService();

        try {
            const user = {
                email: req.body.email,
                password: await passwordService.hash(req.body.password),
                name: req.body.name,
                firstname: req.body.firstname
            };

            const userRepository = new UserRepository();
            const newUser = await userRepository.create(user);

            return Response.created(req, res, newUser);
        } catch (err) {
            return Response.error(req, res, err.message);
        }
    };
}

export default new UserControllerRegister();
