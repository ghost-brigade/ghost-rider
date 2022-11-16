import PrismaClientService from "../service/Database/prismaClient.service.js";

class PrismaRepository {
  constructor() {
    if (this.constructor === PrismaRepository) {
      throw new Error("Abstract classes can't be instantiated.");
    }
    this.prisma = PrismaClientService.getInstance();
  }
  prisma() {
    return this.prisma;
  }
}

export default PrismaRepository;
