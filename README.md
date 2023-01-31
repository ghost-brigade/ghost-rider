# Ghost Rider

[![codecov](https://codecov.io/gh/ghost-brigade/ghost-riders/branch/master/graph/badge.svg?token=izZSSrNocB)](https://codecov.io/gh/ghost-brigade/ghost-riders)

## Description
Hop on, buckle up, and get ready for a wild ride! This is the ultimate destination for all motorcycle enthusiasts, a place where you can rev your engines, swap stories, and fulfill your need for speed.

We've got it all: from the latest and greatest motorcycles, to all the juicy gossip about the motorcycle world. You can communicate with our chatbot to get all the information you need, or just sit back and relax while browsing through our vast collection of motorcycles. And if you're feeling brave, you can even purchase your dream bike right here!

So, put on your leather jacket, grab a helmet, and join us on this unforgettable journey. Who needs a cape when you've got two wheels and a throttle? Get ready to become a Ghost Rider!

by [chatgpt](https://chat.openai.com/)

## How to use

Copy .env.example to .env

1. Clone the repository.
2. Copy the `.env.example` file to `.env` and fill in the necessary values.
3. Install dependencies by running `make init`.
4. Create a database and seed it by running `make db`.
5. Start the application by running `make run`.

Access to the **API** : http://localhost:5000

Access to the **front** : http://localhost:5173

***if you want to run tests :***
1. Copy the `.env.example` file to `.env.test` and fill in the necessary values.
2. Run `make test`.

## Default users

* Administrateur : anthony@ghostrider.fr:admin
* Vendeur : karl@esgi.fr:seller
* Utilisateur : anthony@ghostrider.fr:user

## Public access

The application is hosted at https://ghost-riders.com/ (coming soon) for public access.

## Technologies Used

* Express
* Vue.js
* Prisma
* PostgreSQL
* Docker

## Contributors

* **Maxime Carluer** - [github](https://github.com/maximecarl)
* **Anthony Arjona** - [github](https://github.com/anthonyarjona)
* **Louis Moulin** - [github](https://github.com/MoulinLouis)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
