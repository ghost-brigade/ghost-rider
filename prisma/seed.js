import {PrismaClient} from '@prisma/client';
const prisma = new PrismaClient();
import bcrypt from 'bcryptjs';
import env from "../config.js";

env();

async function main() {
    const louis = await prisma.user.upsert({
        where: {email: 'louis@ghostrider.fr'},
        update: {},
        create: {
            email: 'louis@ghostrider.fr',
            name: 'Louis',
            firstName: 'Moulin',
            password: await bcrypt.hash('admin', await bcrypt.genSalt()),
            isAdmin: true
        }
    });

    const anthony = await prisma.user.upsert({
        where: {email: 'anthony@ghostrider.fr'},
        update: {},
        create: {
            email: 'anthony@ghostrider.fr',
            name: 'Anthony',
            firstName: 'Arjona',
            password: await bcrypt.hash('admin', await bcrypt.genSalt()),
            isAdmin: true
        }
    });

    const maxime = await prisma.user.upsert({
        where: {email: 'maxime@ghostrider.fr'},
        update: {},
        create: {
            email: 'maxime@ghostrider.fr',
            name: 'Maxime',
            firstName: 'Carluer',
            password: await bcrypt.hash('admin', await bcrypt.genSalt()),
            isAdmin: true
        }
    });

    const karl = await prisma.user.upsert({
        where: {email: 'karl@esgi.fr'},
        update: {},
        create: {
            email: 'karl@esgi.fr',
            name: 'Karl',
            firstName: 'xxx',
            password: await bcrypt.hash('user', await bcrypt.genSalt()),
            isAdmin: false
        }
    });

    const amine = await prisma.user.upsert({
        where: {email: 'amine@esgi.fr'},
        update: {},
        create: {
            email: 'amine@esgi.fr',
            name: 'Amine',
            firstName: 'xxx',
            password: await bcrypt.hash('user', await bcrypt.genSalt()),
            isAdmin: false
        }
    });

    console.log({louis, anthony, maxime, karl, amine});
}
main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });