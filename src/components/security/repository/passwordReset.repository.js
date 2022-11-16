import PrismaRepository from "../../../common/repository/prisma.repository.js";

class PasswordResetRepository extends PrismaRepository {

  /**
   * @param {Int} id
   * @param {String} token
   * @returns {Promise<Object>}
   * @returns {Promise<*>}
   */
  find = async ({id, token}) => {
    if (id !== undefined && token !== undefined) {
      throw new Error('Missing parameters');
    }

    const resetToken = await this.prisma.Passwordreset.findFirst({
      where: {
        AND : [id !== undefined ? {id: id, isDeleted: false} : {token: token, isDeleted: false}]
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    if (resetToken === null) {
      throw new Error('Invalid token');
    }
    return resetToken;
  };

  /**
   * Find the last password reset request for a user
   * @param email
   * @returns {Promise<*>}
   */
  findLastByUserId = async (email) => {
    return await this.prisma.Passwordreset.findFirst({
      where: {
        email: email,
        isDeleted: false
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
  };

  /**
   * @param {Object} user
   * @returns {Promise<*>}
   */
  create = async ({email, token}) => {
    const resetToken = await this.prisma.Passwordreset.create({
      data: {
        email: email,
        token: token
      }
    });

    if (resetToken === null) {
      throw new Error('An error occurred during the creation of the token');
    }
    return resetToken;
  };

  /**
   * @param {int} id
   * @param {string} token
   * @returns {Promise<*>}
   */
  update = async ({id, token}) => {
    if (id !== undefined && token !== undefined) {
      throw new Error('Missing parameters');
    }

    const deletedToken = await this.prisma.Passwordreset.update({
      where: id !== undefined ? {id: id} : {token: token},
      data: {
        isDeleted: true
      }
    });

    if (deletedToken === null) {
      throw new Error('An error occurred during the deletion of the token');
    }
    return deletedToken;
  };

}

export default PasswordResetRepository;
