import PrismaRepository from "../../../common/repository/prisma.repository.js";

class MessageRepository extends PrismaRepository {

  /**
   * @param {int} id
   * @returns {Promise<Object>}
   * @returns {Promise<*>}
   */
  find = async (id) => {
    return await this.prisma.message.findUnique({
      where: {
        id: id
      }
    });
  };

  /**
   * @returns {Promise<*>}
   */
  findAll = async () => {
    return await this.prisma.message.findMany();
  };

  /**
   * @param {Object} data
   * @returns {Promise<*>}
   */
  create = async (data) => {
    const newMessage = await this.prisma.message.create({
      data: data
    });

    if (newMessage === null) {
      throw new Error('An error occurred while creating the user');
    }
    return newMessage;
  };

}

export default MessageRepository;
