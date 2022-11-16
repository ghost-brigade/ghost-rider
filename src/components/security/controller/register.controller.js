import * as Response from "../../../common/service/Http/Response.js";
import UserRepository from "../../user/repository/user.repository.js";
import Controller from "../../../common/controller/controller.js";
import PasswordService from "../service/security/password.service.js";
import emailEvent from "../../email/event/email.event.js";
import Email from "../../email/email.js";
import UserRegistrationTokenService from "../service/security/userRegistrationToken.service.js";

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
    if (req.body === undefined || req.body.email === undefined || req.body.password === undefined || req.body.name === undefined || req.body.firstname === undefined) {
      return Response.unprocessableEntity(req, res, "Missing parameters");
    }

    const {email, password, name, firstname} = req.body;

    try {
      await this.userRepository.findByEmail(email);
    } catch (e) {
      return Response.unprocessableEntity(req, res, "Email already used");
    }

    const passwordService = new PasswordService();

    try {
      const user = {
        email: email,
        password: await passwordService.hash(password),
        name: name,
        firstname: firstname
      };

      const newUser = await this.userRepository.create(user);

      const userRegistrationTokenService = new UserRegistrationTokenService(newUser.email);
      const token = await userRegistrationTokenService.generate();

      emailEvent.emit("send", new Email({to: newUser.email,
        subject: "Confirmation de votre compte",
        template: "confirm-account",
        context: {
          name: newUser.name,
          app_name: "Ghost rider",
          link: req.url + "/register/confirm/" + token
        }})
      );

      return Response.created(req, res, newUser);
    } catch (err) {
      return Response.error(req, res, err.message);
    }
  };

  //TODO : confirm account controller with token function from service/security/userRegistrationToken.service.js
  /*
        const userRegistrationTokenService = new UserRegistrationTokenService(email);

        generate token with : await userRegistrationTokenService.generate();
        verify token with : await userRegistrationTokenService.verify(token);
   */

  //TODO : test registration
}

export default new UserControllerRegister();
