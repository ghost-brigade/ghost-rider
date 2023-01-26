import PrismaRepository from "../../../common/repository/prisma.repository.js";

class MaintenanceRepository extends PrismaRepository {

  /**
   * @param {int} id
   * @returns {Promise<Object>}
   * @returns {Promise<*>}
   */
  find = async (id) => {
    return await this.prisma.maintenance.findUnique({
      where: {
        id: id
      }
    });
  };

  /**
   * @returns {Promise<*>}
   */
  findAll = async () => {
    return await this.prisma.maintenance.findMany();
  };

  /**
   * @returns {Promise<*>}
   */
  findAllByType = async (type) => {
    return await this.prisma.maintenance.findMany({
      where: {
        type: type,
        isActive: true,
        appointment: {
          gte: new Date()
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
  };

  /**
   * @param {Object} data
   * @returns {Promise<*>}
   */
  create = async (data) => {
    const newMessage = await this.prisma.maintenance.create({
      data: data
    });

    if (newMessage === null) {
      throw new Error('An error occurred while creating the maintenance');
    }
    return newMessage;
  };

}

export default MaintenanceRepository;
