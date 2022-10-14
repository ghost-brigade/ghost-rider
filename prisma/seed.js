import bcrypt from 'bcryptjs';
import config from "../config.js";
import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

config.env();

async function main() {
    const louis = await prisma.user.upsert({
        where: {email: 'louis@ghostrider.fr'},
        update: {},
        create: {
            email: 'louis@ghostrider.fr',
            name: 'Louis',
            firstname: 'Moulin',
            password: await bcrypt.hash('admin', await bcrypt.genSalt()),
            roles: ['ROLE_ADMIN']
        }
    });

    const anthony = await prisma.user.upsert({
        where: {email: 'anthony@ghostrider.fr'},
        update: {},
        create: {
            email: 'anthony@ghostrider.fr',
            name: 'Anthony',
            firstname: 'Arjona',
            password: await bcrypt.hash('admin', await bcrypt.genSalt()),
            roles: ['ROLE_ADMIN']
        }
    });

    const maxime = await prisma.user.upsert({
        where: {email: 'maxime@ghostrider.fr'},
        update: {},
        create: {
            email: 'maxime@ghostrider.fr',
            name: 'Maxime',
            firstname: 'Carluer',
            password: await bcrypt.hash('admin', await bcrypt.genSalt()),
            roles: ['ROLE_ADMIN']
        }
    });

    const karl = await prisma.user.upsert({
        where: {email: 'karl@esgi.fr'},
        update: {},
        create: {
            email: 'karl@esgi.fr',
            name: 'Karl',
            firstname: 'xxx',
            password: await bcrypt.hash('user', await bcrypt.genSalt()),
            roles: ['ROLE_SELLER']
        }
    });

    const amine = await prisma.user.upsert({
        where: {email: 'amine@esgi.fr'},
        update: {},
        create: {
            email: 'amine@esgi.fr',
            name: 'Amine',
            firstname: 'xxx',
            password: await bcrypt.hash('user', await bcrypt.genSalt()),
            roles: ['ROLE_USER']
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
