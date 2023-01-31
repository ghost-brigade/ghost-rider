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
      lastname: 'Louis',
      firstname: 'Moulin',
      password: await bcrypt.hash('admin', await bcrypt.genSalt()),
      isActive: true,
      roles: ['ROLE_ADMIN']
    }
  });

  const anthony = await prisma.user.upsert({
    where: {email: 'anthony@ghostrider.fr'},
    update: {},
    create: {
      email: 'anthony@ghostrider.fr',
      lastname: 'Anthony',
      firstname: 'Arjona',
      password: await bcrypt.hash('admin', await bcrypt.genSalt()),
      isActive: true,
      roles: ['ROLE_ADMIN']
    }
  });

  const maxime = await prisma.user.upsert({
    where: {email: 'maxime@ghostrider.fr'},
    update: {},
    create: {
      email: 'maxime@ghostrider.fr',
      lastname: 'Maxime',
      firstname: 'Carluer',
      password: await bcrypt.hash('admin', await bcrypt.genSalt()),
      isActive: true,
      roles: ['ROLE_ADMIN']
    }
  });

  const karl = await prisma.user.upsert({
    where: {email: 'karl@esgi.fr'},
    update: {},
    create: {
      email: 'karl@esgi.fr',
      lastname: 'Karl',
      firstname: 'Marques Bernardo',
      password: await bcrypt.hash('seller', await bcrypt.genSalt()),
      isActive: true,
      roles: ['ROLE_SELLER']
    }
  });

  const amin = await prisma.user.upsert({
    where: {email: 'amin@esgi.fr'},
    update: {},
    create: {
      email: 'amin@esgi.fr',
      lastname: 'Amin',
      firstname: 'Nairi',
      password: await bcrypt.hash('user', await bcrypt.genSalt()),
      isActive: true,
      roles: ['ROLE_USER']
    }
  });

  const yves = await prisma.user.upsert({
    where: {email: 'yves@esgi.fr'},
    update: {},
    create: {
      email: 'yves@esgi.fr',
      lastname: 'Yves',
      firstname: 'Skrzypczyk',
      password: await bcrypt.hash('user', await bcrypt.genSalt()),
      isActive: true,
      roles: ['ROLE_USER']
    }
  });

  const adrien = await prisma.user.upsert({
    where: {email: 'adrien@esgi.fr'},
    update: {},
    create: {
      email: 'adrien@esgi.fr',
      lastname: 'Adrien',
      firstname: 'Morin',
      password: await bcrypt.hash('user', await bcrypt.genSalt()),
      isActive: true,
      roles: ['ROLE_USER']
    }
  });

  console.log({louis, anthony, maxime, karl, amin, yves, adrien});
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
