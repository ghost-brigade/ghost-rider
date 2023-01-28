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
  create = async ({name, limit}) => {
    const newChannel = await this.prisma.channel.create({
      data: {
        name: name,
        limit: limit
      }
    });

    if (newChannel === null) {
      throw new Error('An error occurred while creating the user');
    }
    return newChannel;
  };

  /**
   * @param {int} id
   * @param {Object} channel
   * @returns {Promise<*>}
   */
  update = async (id, {name, limit}) => {
    const data = {};
    if (name !== undefined) {data.name = name;}
    if (limit !== undefined) {data.limit = limit;}

    const channel = await this.prisma.channel.update({
      where: {
        id: id
      },
      data: data
    });

    if (channel === null) {
      throw new Error('An error occurred while updating the channel');
    }
    return channel;
  };

  /**
   * @param {int} id
   * @returns {Promise<*>}
   */
  delete = async (id) => {
    try {
      await this.prisma.channel.delete({
        where: {
          id: id
        }
      });
      return;
    } catch (err) {
      throw new Error('An error occurred while deleting the channel');
    }
  };
}

export default ChannelRepository;
