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

  const message_trending_1 = await prisma.message.upsert({
    where: {id: 1},
    update: {},
    create: {
      message: 'J\'aimerais savoir si vous avez des conseils pour les motards débutants ?',
      channel: {
        connect: {id: channel_trending.id}
      },
      user: {
        connect: {id: yves.id}
      }
    }
  });

  const message_trending_2 = await prisma.message.upsert({
    where: {id: 2},
    update: {},
    create: {
      message: 'Bonjour Yves, oui bien sûr, je vous invite à regarder à suivre mon cours sur VIM. Je pourrais faire une aparté sur les motards débutants.',
      channel: {
        connect: {id: channel_trending.id}
      },
      user: {
        connect: {id: amin.id}
      }
    }
  });

  const message_trending_3 = await prisma.message.upsert({
    where: {id: 3},
    update: {},
    create: {
      message: 'Merci beaucoup Amin, je vais regarder ça de suite !',
      channel: {
        connect: {id: channel_trending.id}
      },
      user: {
        connect: {id: yves.id}
      }
    }
  });

  const message_trending_4 = await prisma.message.upsert({
    where: {id: 4},
    update: {},
    create: {
      message: 'Je me joindrais à la conversation, je suis débutant aussi !',
      channel: {
        connect: {id: channel_trending.id}
      },
      user: {
        connect: {id: adrien.id}
      }
    }
  });

  const message_event_1 = await prisma.message.upsert({
    where: {id: 5},
    update: {},
    create: {
      message: 'Hé les gars, savez-vous qu\'il y a un événement de moto incroyable qui aura lieu la semaine prochaine?',
      channel: {
        connect: {id: channel_event.id}
      },
      user: {
        connect: {id: adrien.id}
      }
    }
  });

  const message_event_2 = await prisma.message.upsert({
    where: {id: 6},
    update: {},
    create: {
      message: 'Vraiment? Où ça?',
      channel: {
        connect: {id: channel_event.id}
      },
      user: {
        connect: {id: karl.id}
      }
    }
  });

  const message_event_3 = await prisma.message.upsert({
    where: {id: 7},
    update: {},
    create: {
      message: 'J\'espère que ce n\'est pas un autre événement annulé à cause de la pluie!',
      channel: {
        connect: {id: channel_event.id}
      },
      user: {
        connect: {id: amin.id}
      }
    }
  });

  const message_event_4 = await prisma.message.upsert({
    where: {id: 8},
    update: {},
    create: {
      message: 'Non, non, c\'est le Festival annuel de la moto de Sturgis. Il y aura des centaines de motos, des concerts et des activités pour tout le monde!',
      channel: {
        connect: {id: channel_event.id}
      },
      user: {
        connect: {id: adrien.id}
      }
    }
  });

  const message_event_5 = await prisma.message.upsert({
    where: {id: 9},
    update: {},
    create: {
      message: 'Oh ouais! Je suis déjà allé à celui de l\'année dernière et c\'était incroyable. Mais Personne 3, tu ne devrais pas t\'inquiéter de la pluie. C\'est une partie intégrante de l\'expérience de conduite en moto. C\'est comme ajouter une touche supplémentaire d\'adrénaline!',
      channel: {
        connect: {id: channel_event.id}
      },
      user: {
        connect: {id: karl.id}
      }
    }
  });

  const message_security_1 = await prisma.message.upsert({
    where: {id: 10},
    update: {},
    create: {
      message: 'Vous savez, j\'ai entendu dire que la plupart des accidents de moto sont causés par des conducteurs non casqués.',
      channel: {
        connect: {id: channel_security.id}
      },
      user: {
        connect: {id: amin.id}
      }
    }
  });

  const message_security_2 = await prisma.message.upsert({
    where: {id: 11},
    update: {},
    create: {
      message: 'Oh s\'il te plaît, c\'est juste une excuse pour ne pas avoir à porter un casque ennuyeux.',
      channel: {
        connect: {id: channel_security.id}
      },
      user: {
        connect: {id: yves.id}
      }
    }
  });

  const message_security_3 = await prisma.message.upsert({
    where: {id: 12},
    update: {},
    create: {
      message: 'Non, non, c\'est vrai! J\'ai vu un article qui disait que porter un casque peut réduire les risques de blessure grave à la tête de plus de 40%.',
      channel: {
        connect: {id: channel_security.id}
      },
      user: {
        connect: {id: adrien.id}
      }
    }
  });

  const message_security_4 = await prisma.message.upsert({
    where: {id: 13},
    update: {},
    create: {
      message: 'Voyez, c\'est pour ça que je porte toujours un casque intégral. Je préfère avoir l\'air stupide plutôt que de me blesser gravement la tête.',
      channel: {
        connect: {id: channel_security.id}
      },
      user: {
        connect: {id: amin.id}
      }
    }
  });

  const message_security_5 = await prisma.message.upsert({
    where: {id: 14},
    update: {},
    create: {
      message: 'Je suis d\'accord avec toi. Et puis, les casques modernes sont tellement plus confortables et élégants qu\'avant. C\'est comme avoir un style supplémentaire sur votre moto!',
      channel: {
        connect: {id: channel_security.id}
      },
      user: {
        connect: {id: yves.id}
      }
    }
  });

  const message_tips_1 = await prisma.message.upsert({
    where: {id: 15},
    update: {},
    create: {
      message: 'Vous savez quoi les gars? J\'ai appris une astuce incroyable pour améliorer ma conduite en moto.',
      channel: {
        connect: {id: channel_tips.id}
      },
      user: {
        connect: {id: karl.id}
      }
    }
  });

  const message_tips_2 = await prisma.message.upsert({
    where: {id: 16},
    update: {},
    create: {
      message: 'Oh vraiment? Dis nous plus!',
      channel: {
        connect: {id: channel_tips.id}
      },
      user: {
        connect: {id: adrien.id}
      }
    }
  });

  const message_tips_3 = await prisma.message.upsert({
    where: {id: 17},
    update: {},
    create: {
      message: 'Est-ce que c\'est quelque chose à voir avec le fait de garder les deux mains sur les poignées?',
      channel: {
        connect: {id: channel_tips.id}
      },
      user: {
        connect: {id: amin.id}
      }
    }
  });

  const message_tips_4 = await prisma.message.upsert({
    where: {id: 18},
    update: {},
    create: {
      message: 'Non, non, c\'est encore plus simple que ça. Il suffit de chanter un air de votre choix à haute voix pendant que vous roulez.',
      channel: {
        connect: {id: channel_tips.id}
      },
      user: {
        connect: {id: amin.id}
      }
    }
  });

  const message_tips_5 = await prisma.message.upsert({
    where: {id: 19},
    update: {},
    create: {
      message: 'Vraiment? Ça aide vraiment?',
      channel: {
        connect: {id: channel_tips.id}
      },
      user: {
        connect: {id: karl.id}
      }
    }
  });

  const message_tips_6 = await prisma.message.upsert({
    where: {id: 20},
    update: {},
    create: {
      message: 'Vraiment? Ça aide vraiment?',
      channel: {
        connect: {id: channel_tips.id}
      },
      user: {
        connect: {id: adrien.id}
      }
    }
  });

  console.log({
    louis,
    anthony,
    maxime,
    karl,
    amin,
    yves,
    adrien,
    channel_trending,
    channel_event,
    channel_security,
    channel_tips,
    message_trending_1,
    message_trending_2,
    message_trending_3,
    message_trending_4,
    message_event_1,
    message_event_2,
    message_event_3,
    message_event_4,
    message_event_5,
    message_security_1,
    message_security_2,
    message_security_3,
    message_security_4,
    message_security_5,
    message_tips_1,
    message_tips_2,
    message_tips_3,
    message_tips_4,
    message_tips_5,
    message_tips_6,
  });
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
