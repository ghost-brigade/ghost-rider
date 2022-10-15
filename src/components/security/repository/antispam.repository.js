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
    const user = await this.prisma.user.findUnique({
      where: {
        email: email
      }
    });

    if (user === null) {
      throw new Error('User not found');
    }
    return user;
  };

  /**
   * @returns {Promise<*>}
   */
  findAll = async () => {
    const users = await this.prisma.user.findMany();

    if (users === null) {
      throw new Error('Users not found');
    }
    return users;
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
      throw new Error('User not created');
    }
    return newUser;
  };
}

export default UserRepository;
