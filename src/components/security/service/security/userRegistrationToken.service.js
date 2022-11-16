import crypto from 'crypto';

class UserRegistrationTokenService {
  #email;

  /**
   * Set the email
   * @param email
   */
  constructor(email) {
    this.#email = email;
  }

  /**
   * Generate a token
   * @returns {string}
   */
  generate() {
    return crypto.createHmac('sha256', process.env.SECRET).update(this.#email).digest('hex');
  }

  /**
   * Check if the token is valid
   * @param token
   * @returns {boolean}
   */
  verify(token) {
    return this.generate() === token;
  }
}

export default UserRegistrationTokenService;
