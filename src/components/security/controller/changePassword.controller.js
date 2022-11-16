import * as Response from "../../../common/service/Http/Response.js";
import Controller from "../../../common/controller/controller.js";
import UserRepository from "../../user/repository/user.repository.js";
import PasswordResetRepository from "../repository/passwordReset.repository.js";
import PasswordService from "../service/security/password.service.js";
import emailEvent from "../../email/event/email.event.js";
import Email from "../../email/email.js";
import TokenValidityService from "../service/token/tokenValidity.service.js";

class ChangePasswordController extends Controller {

  constructor() {
    super();
    this.userRepository = new UserRepository();
    this.passwordResetRepository = new PasswordResetRepository();
  }

  /**
   * Change a password
   * @param {Request} req
   * @param {Response} res
   * @returns {Promise<*>}
   */
  changePassword = async (req, res) => {
    if (req.body === undefined || req.body.token === undefined || req.body.password === undefined) {
      return Response.unprocessableEntity(req, res, "Missing parameters");
    }

    try {
      const {token, password} = req.body;

      if (token === undefined) {
        return Response.unprocessableEntity(req, res, "Missing Token");
      }

      if (password === undefined) {
        return Response.unprocessableEntity(req, res, "Missing Password");
      }

      const passwordReset = await this.passwordResetRepository.find({token});
      if (passwordReset === null) {
        return Response.notFound(req, res, "Token not found");
      }

      const tokenService = new TokenValidityService(passwordReset);
      if (tokenService.isValid() === false) {
        return Response.unprocessableEntity(req, res, "Token is expired");
      }

      const user = await this.userRepository.findByEmail(passwordReset.email);
      if (user === null) {
        return Response.notFound(req, res, "User not found");
      }

      const passwordService = new PasswordService();
      user.password = await passwordService.hash(password);
      await this.userRepository.update({id: user.id}, user);

      await this.passwordResetRepository.update({token});

      emailEvent.emit('send', new Email({
        to: user.email,
        subject: 'Password Changed',
        template: 'password/password-changed.html'
      }));

      return Response.ok(req, res, {
        message: "Password changed successfully"
      });
    } catch (err) {
      return Response.internalServerError(req, res, err.message);
    }
  };
}

export default new ChangePasswordController();
