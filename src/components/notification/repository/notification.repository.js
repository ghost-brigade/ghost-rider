import PrismaRepository from "../../../common/repository/prisma.repository.js";

class NotificationRepository extends PrismaRepository {

  /**
   * @param {Object} user
   * @returns {Promise<*>}
   */
  create = async (user, message) => {
    // Create a new notification
    const notification = await this.prisma.notification.create({
      data: {
        user: {
          connect: {
            id: user.id
          }
        },
        title: '',
        message: message
      }
    });

    // Publish the new notification to all connected clients
    // this.prisma.$publish('notificationCreated', notification);

    if (notification === null) {
      throw new Error('An error occurred while creating the notification');
    }
    return notification;
  };

  /**
   * @param {int} id
   * @returns {Promise<Object>}
   * @returns {Promise<*>}
   */
  find = async (id) => {
    const user = await this.prisma.notification.findUnique({
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
   * @returns {Promise<*>}
   */
  findAll = async () => {
    return await this.prisma.notification.findMany({
      orderBy: [
        {isRead: 'asc'},
        {createdAt: 'desc'}
      ]
    });
  };

}

export default NotificationRepository;
