import moment from 'moment';

class TokenValidityService {
  TOKEN_LIFETIME = 60 * 60;
  TOKEN_TIME_BETWEEN_REQUESTS = 60 * 60;

  #token;

  /**
   * Generate a token
   * @param token {Object}
   */
  constructor(token) {
    if (token !== undefined) {
      this.token = token;
    }
  }

  set token(token) {
    if (token === undefined) {
      throw new Error('Token is not valid');
    }

    if (Object.prototype.hasOwnProperty.call(token, 'createdAt') === false) {
      throw new Error('Token does not have a createdAt property');
    }
    this.#token = token;
  }

  get token() {
    return this.#token;
  }

  /**
   * Check if token is expired
   * @returns {boolean}
   */
  isValid() {
    const createdAt = moment(this.#token.createdAt);
    const now = moment();

    return now.diff(createdAt, 'seconds') < this.TOKEN_LIFETIME;
  }

  isAuthorizedToRequest() {
    const createdAt = moment(this.#token.createdAt);
    const now = moment();

    return now.diff(createdAt, 'seconds') > this.TOKEN_TIME_BETWEEN_REQUESTS;
  }
}

export default TokenValidityService;
