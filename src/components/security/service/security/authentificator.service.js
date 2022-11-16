import UserRepository from "../../../user/repository/user.repository.js";
import PasswordService from "./password.service.js";
import TokenService from "../jwt/token.service.js";

class AuthentificatorService {

  constructor() {
    this.userRepository = new UserRepository();
    this.passwordService = new PasswordService();
    this.tokenService = new TokenService();
  }
  /**
   * Authenticate a user and return a JWT token
   * @param {string} email
   * @param {string} password
   * @returns {Promise<*>}
   */
  authenticate = async (email, password) => {

    const user = await this.userRepository.findByEmail(email);
    const match = await this.passwordService.validate(password, user.password);

    if (match === false) {
      throw new Error('email or password are incorrect');
    }

    if (user.isActive === false) {
      throw new Error("You're account is not active");
    }

    return await this.tokenService.create(user);
  };

}

export default AuthentificatorService;
