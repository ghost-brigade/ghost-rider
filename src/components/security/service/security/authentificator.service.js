import UserRepository from "../../../user/repository/user.repository.js";
import PasswordService from "./password.service.js";
import TokenService from "../jwt/token.service.js";

class AuthentificatorService {

  /**
   * Authenticate a user and return a JWT token
   * @param {string} email
   * @param {string} password
   * @returns {Promise<*>}
   */
  authenticate = async (email, password) => {

    const user = await UserRepository.findByEmail(email);

    const match = await PasswordService.validate(password, user.password);
    if (match === false) {
      throw new Error('PasswordService or email are incorrect');

    }

    return await TokenService.create(user);
  };

}

export default new AuthentificatorService;
