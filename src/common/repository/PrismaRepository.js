import {PrismaClient} from '@prisma/client';

class PrismaRepository {
    constructor() {
        this.prisma = new PrismaClient();
    }
    prisma() {
        return this.prisma;
    }
}

export default PrismaRepository;
