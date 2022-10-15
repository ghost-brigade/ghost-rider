import PrismaRepository from "../../../common/repository/prisma.repository.js";
import AntispamService from "../service/antispam/antispam.service.js";

class AntispamRepository extends PrismaRepository {

  /**
   * @param {string} ip
   * @param {string} email
   * @returns {Promise<*>}
   */
  async findByIpAddrAndUserEmail(ip, email) {
    return await this.prisma.antispam.findMany({
      where: {
        ip: ip,
        email: email,
        createdAt: {
          lte: new Date(new Date().getTime() - 60 * 60 * (AntispamService.SPAM_BAN_TIME * 1000))
        }
      }
    });
  }

  /**
   * @param {string} ip
   * @param {string} email
   * @returns {Promise<*>}
   */
  async create(ip, email) {
    return await this.prisma.antispam.create({
      data: {
        ip: ip,
        email: email,
      }
    });
  }

}

export default AntispamRepository;
