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

  const channel_trending = await prisma.channel.upsert({
    where: {id: 1},
    update: {},
    create: {
      name: 'Les dernières tendances en matière de moto',
      limit: 10,
    }
  });

  const channel_event = await prisma.channel.upsert({
    where: {id: 2},
    update: {},
    create: {
      name: 'Les événements de moto à ne pas manquer',
      limit: 100,
    }
  });

  const channel_security = await prisma.channel.upsert({
    where: {id: 3},
    update: {},
    create: {
      name: 'L\'importance de la sécurité en moto',
      limit: 30,
    }
  });

  const channel_tips = await prisma.channel.upsert({
    where: {id: 4},
    update: {},
    create: {
      name: 'Les astuces pour améliorer votre conduite en moto',
      limit: 10,
    }
  });

  const channel_best_track = await prisma.channel.upsert({
    where: {id: 5},
    update: {},
    create: {
      name: 'Les meilleurs circuits pour les motards',
      limit: 5,
    }
  });

  const message_1 = await prisma.message.upsert({
    where: {id: 1},
    update: {},
    create: {
      message: 'Hello, welcome to the channel!',
      channel: {
        connect: {id: channel_trending.id}
      },
      user: {
        connect: {id: yves.id}
      }
    }
  });

  console.log({louis, anthony, maxime, karl, amin, yves, adrien, channel_trending, channel_event, channel_security, channel_tips, channel_best_track, message_1});
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
