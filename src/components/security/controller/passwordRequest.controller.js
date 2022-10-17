import * as Response from "../../../common/service/Http/Response.js";
import Controller from "../../../common/controller/controller.js";
import PasswordResetRepository from "../repository/passwordReset.repository.js";
import GenerateResetPasswordTokenService from "../service/security/generateResetPasswordToken.service.js";
import AntispamService from "../service/antispam/antispam.service.js";

class PasswordRequestController extends Controller {

  constructor() {
    super();
    this.userRepository = new PasswordResetRepository();
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

      if (this.userRepository.findByEmail(email) === undefined) {
        return Response.notFound(req, res, "User not found");
      }

      await (new AntispamService).createAuthenticationAttemptError(req.body.ip, req.body);

      const token = (new GenerateResetPasswordTokenService()).token;
      await this.passwordResetRepository.create({email, token});

      /**
       * TODO email the user with the token
       */

      return Response.ok(req, res, {
        message: "A password reset email has been sent to your email address"
      });
    } catch (err) {
      return Response.notFound(req, res, err.message);
    }
  };
}

export default new PasswordRequestController();
