import * as Response from "../../../common/service/Http/Response.js";
import Controller from "../../../common/controller/controller.js";
import UserRepository from "../../user/repository/user.repository.js";
import PasswordResetRepository from "../repository/passwordReset.repository.js";

class ChangePasswordController extends Controller {

  constructor() {
    super();
    this.userRepository = new UserRepository();
    this.passwordResetRepository = new PasswordResetRepository();
  }

  changePassword = async (req, res) => {

    const {password, token} = req.body;

    if (password === undefined || token === undefined) {
      return Response.unprocessableEntity(req, res, "Missing parameters");
    }

    try {
      const passwordReset = await this.passwordResetRepository.find({token: token});
      try {
        await this.passwordResetRepository.delete({token: token});
        const user = await this.userRepository.update(
          {email: passwordReset.email},
          {password: password}
        );
        return Response.ok(req, res, user);
      } catch (err) {
        return Response.error(req, res, err.message);
      }
    } catch (err) {
      return Response.unprocessableEntity(req, res, err.message);
    }
  };
}

export default new ChangePasswordController();
