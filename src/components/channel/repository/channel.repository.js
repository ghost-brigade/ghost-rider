import PrismaRepository from "../../../common/repository/prisma.repository.js";

class ChannelRepository extends PrismaRepository {

  /**
   * @param {int} id
   * @returns {Promise<Object>}
   * @returns {Promise<*>}
   */
  find = async (id) => {
    return await this.prisma.channel.findUnique({
      where: {
        id: id
      }
    });
  };

  /**
   * @returns {Promise<*>}
   */
  findAll = async () => {
    return await this.prisma.channel.findMany();
  };

  /**
   * @param {Object} channel
   * @returns {Promise<*>}
   */
  create = async (channel) => {
    const newChannel = await this.prisma.channel.create({
      data: channel
    });

    if (newChannel === null) {
      throw new Error('An error occurred while creating the user');
    }
    return newChannel;
  };

}

export default ChannelRepository;
