import * as Response from "../../../common/service/Http/Response.js";
import UserRepository from "../../user/repository/user.repository.js";
import Controller from "../../../common/controller/controller.js";
import PasswordService from "../service/security/password.service.js";
import emailEvent from "../../email/event/email.event.js";
import Email from "../../email/email.js";
import UserRegistrationTokenService from "../service/security/userRegistrationToken.service.js";
import Url from "../../../common/service/Http/Url.js";

class UserControllerRegister extends Controller {

  constructor() {
    super();
    this.userRepository = new UserRepository();
  }

  /**
   * Register a new user
   * @param {Request} req
   * @param {Response} res
   * @returns {Promise<*>}
   */
  register = async (req, res) => {
    if (req.body === undefined || req.body.email === undefined || req.body.password === undefined || req.body.lastname === undefined || req.body.firstname === undefined) {
      return Response.unprocessableEntity(req, res, "Missing parameters");
    }

    const {email, password, lastname, firstname} = req.body;

    const match = await this.userRepository.findByEmail(email);

    if (match) {
      return Response.unprocessableEntity(req, res, "User with this email address already exists");
    }

    const passwordService = new PasswordService();

    try {
      const user = {
        email: email,
        password: await passwordService.hash(password),
        lastname: lastname,
        firstname: firstname,
        roles: ["ROLE_USER"]
      };

      const newUser = await this.userRepository.create(user);

      const userRegistrationTokenService = new UserRegistrationTokenService(newUser.email);
      const token = await userRegistrationTokenService.generate();

      emailEvent.emit("send", new Email({to: newUser.email,
        subject: "Confirmation de votre compte",
        template: "confirm-account",
        context: {
          lastname: newUser.lastname,
          app_name: "Ghost rider",
          link: Url.getBaseUrl(req) + "/register/confirm/" + token
        }})
      );

      return Response.created(req, res, newUser);
    } catch (err) {
      return Response.error(req, res, err.message);
    }
  };

  confirm = async (req, res) => {
    if (req.body === undefined || req.body.email === undefined || req.body.token === undefined) {
      return Response.unprocessableEntity(req, res, "Missing parameters");
    }

    const {email, token} = req.body;

    const user = await this.userRepository.findByEmail(email);
    if (user === null) {
      return Response.unprocessableEntity(req, res, "User with this email address does not exists");
    }

    const userRegistrationTokenService = new UserRegistrationTokenService(email);
    const isTokenValid = await userRegistrationTokenService.verify(token);

    if (isTokenValid) {
      user.isActive = true;
      await this.userRepository.update({id: user.id}, user);
      return Response.ok(req, res, "Account confirmed, please login to continue");
    }

    return Response.unprocessableEntity(req, res, "Invalid token");
  };

  //TODO : test registration
}

export default new UserControllerRegister();
