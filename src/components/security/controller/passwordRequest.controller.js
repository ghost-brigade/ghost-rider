import * as Response from "../../../common/service/Http/Response.js";
import Controller from "../../../common/controller/controller.js";
import PasswordResetRepository from "../repository/passwordReset.repository.js";
import GenerateResetPasswordTokenService from "../service/security/generateResetPasswordToken.service.js";
import UserRepository from "../../user/repository/user.repository.js";
import emailEvent from "../../email/event/email.event.js";
import Email from "../../email/Email.js";
import PasswordService from "../service/security/password.service.js";

class PasswordRequestController extends Controller {

  constructor() {
    super();
    this.userRepository = new UserRepository();
    this.passwordResetRepository = new PasswordResetRepository();
  }

  /**
   * Request a password reset
   * @param {Request} req
   * @param {Response} res
   * @returns {Promise<*>}
   */
  request = async (req, res) => {
    try {
      const {email} = req.body;

      if (email === undefined) {
        return Response.unprocessableEntity(req, res, "Missing Email");
      }

      const user = await this.userRepository.findByEmail(email);

      if (user === undefined) {
        return Response.notFound(req, res, "User not found");
      }

      const token = (new GenerateResetPasswordTokenService()).token;
      await this.passwordResetRepository.create({email, token});

      emailEvent.emit('send', new Email({
        to: email,
        subject: 'Password Reset',
        template: 'password-reset.html',
        context: {
          token: token
        }
      }));

      return Response.ok(req, res, {
        message: "A reset password email has been sent to your email address"
      });
    } catch (err) {
      return Response.notFound(req, res, err.message);
    }
  };

  /**
   * Reset a password
   * @param {Request} req
   * @param {Response} res
   * @returns {Promise<*>}
   */
  changePassword = async (req, res) => {
    try {
      const {token, password} = req.body;

      if (token === undefined) {
        return Response.unprocessableEntity(req, res, "Missing Token");
      }

      if (password === undefined) {
        return Response.unprocessableEntity(req, res, "Missing Password");
      }

      const passwordReset = await this.passwordResetRepository.find({token});

      if (passwordReset === undefined) {
        return Response.notFound(req, res, "Token not found");
      }

      const user = await this.userRepository.findByEmail(passwordReset.email);

      if (user === undefined) {
        return Response.notFound(req, res, "User not found");
      }

      const passwordService = new PasswordService();

      user.password = await passwordService.hash(password);
      await user.save();

      await this.passwordResetRepository.delete({token});

      return Response.ok(req, res, {
        message: "Password changed successfully"
      });
    } catch (err) {
      return Response.internalServerError(req, res, err.message);
    }
  };
}

export default new PasswordRequestController();
