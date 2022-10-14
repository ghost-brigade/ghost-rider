import {PrismaClient} from '@prisma/client';

class PrismaRepository {
  constructor() {
    if (this.constructor === PrismaRepository) {
      throw new Error("Abstract classes can't be instantiated.");
    }
    this.prisma = new PrismaClient();
  }
  prisma() {
    return this.prisma;
  }
}

export default PrismaRepository;
