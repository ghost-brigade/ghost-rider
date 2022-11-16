import PrismaRepository from "../../../common/repository/prisma.repository.js";

class UserRepository extends PrismaRepository {

  /**
   * @param {int} id
   * @returns {Promise<Object>}
   * @returns {Promise<*>}
   */
  find = async (id) => {
    const user = await this.prisma.user.findUnique({
      where: {
        id: id
      }
    });

    if (user === null) {
      throw new Error('User not found');
    }
    return user;
  };

  /**
   * @param {string} email
   * @returns {Promise<*>}
   */
  findByEmail = async (email) => {
    return await this.prisma.user.findUnique({
      where: {
        email: email
      }
    });
  };

  /**
   * @returns {Promise<*>}
   */
  findAll = async () => {
    return await this.prisma.user.findMany();
  };

  /**
   * @param {Object} user
   * @returns {Promise<*>}
   */
  create = async (user) => {
    const newUser = await this.prisma.user.create({
      data: user
    });

    if (newUser === null) {
      throw new Error('An error occurred while creating the user');
    }
    return newUser;
  };

  /**
   * @param {int} id
   * @param {String} email
   * @param {Object} user
   */
  update = async ({id, email}, user) => {
    if (id === undefined && email === undefined) {
      throw new Error('Missing parameters');
    }

    const updatedUser = await this.prisma.user.update({
      where: id !== undefined ? {id: id} : {email: email},
      data: user
    });

    if (updatedUser === null) {
      throw new Error('An error occurred while updating the user');
    }
    return updatedUser;
  };

}

export default UserRepository;
