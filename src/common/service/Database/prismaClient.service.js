import {PrismaClient} from '@prisma/client';

class PrismaClientService {
  #prisma;

  constructor() {
    this.#prisma = new PrismaClient();
  }

  getInstance() {
    return this.#prisma;
  }
}

export default new PrismaClientService();
