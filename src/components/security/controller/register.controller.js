import * as Response from "../../../common/service/Http/Response.js";
import UserRepository from "../../user/repository/user.repository.js";
import Controller from "../../../common/controller/controller.js";
import bcrypt from "bcryptjs";

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

        try {
            const user = {
                email: req.body.email,
                password: await bcrypt.hash(req.body.password, await bcrypt.genSalt()),
                name: req.body.name,
                firstname: req.body.firstname
            };

            const newUser = await UserRepository.create(user);

            return Response.created(req, res, newUser);
        } catch (err) {
            return Response.error(req, res, err.message);
        }
    };
}

export default new UserControllerRegister();
