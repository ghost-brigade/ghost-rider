import AntispamRepository from "../../repository/antispam.repository.js";

class AntispamService {

  /**
   * 1 hour
   * @type {number}
   */
  static SPAM_BAN_TIME = 1;
  static SPAM_LIMIT = 5;

  constructor(repository = null) {
    this.repository = repository ?? new AntispamRepository();
  }

  /**
   * Add new antispam entry
   * @param {string} ip
   * @param {string} email
   * @returns {Promise<*>}
   */
  async createAuthenticationAttemptError(ip, email) {
    return await this.repository.create(ip, email);
  }

  /**
   * Check if the user is not spamming
   * @param {string} ip
   * @param {string} email
   * @returns {Promise<boolean>}
   */
  async authorizeAuthenticationRequest(ip, email) {
    const antispam = await this.repository.findByIpAddrAndUserEmail(ip, email);

    if (antispam && typeof antispam === 'object' && Object.keys(antispam).length >= AntispamService.SPAM_LIMIT) {
        throw new Error('Too many authentication attempts');
    }

    return true;
  }

}

export default AntispamService;
