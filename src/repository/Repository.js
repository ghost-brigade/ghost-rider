import {PrismaClient} from '@prisma/client';

class Repository {
    constructor() {
        this.prisma = new PrismaClient();
    }
    prisma() {
        return this.prisma;
    }
}

export default Repository;
