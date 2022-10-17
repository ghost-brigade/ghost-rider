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

    const resetToken = await this.prisma.Passwordreset.findUnique({
      where: id !== undefined ? {id: id} : {token: token}
    });

    if (resetToken === null) {
      throw new Error('Invalid token');
    }
    return resetToken;
  };

  /**
   * @param {Object} user
   * @returns {Promise<*>}
   */
  create = async ({email, token}) => {
    const resetToken = await this.prisma.user.create({
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
  delete = async ({id, token}) => {
    if (id !== undefined && token !== undefined) {
      throw new Error('Missing parameters');
    }

    const deletedToken = await this.prisma.user.delete({
      where: id !== undefined ? {id: id} : {token: token}
    });

    if (deletedToken === null) {
      throw new Error('An error occurred during the deletion of the token');
    }
    return deletedToken;
  };

}

export default PasswordResetRepository;
