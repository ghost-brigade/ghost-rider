# Ghost Rider

[![codecov](https://codecov.io/gh/ghost-brigade/ghost-riders/branch/master/graph/badge.svg?token=izZSSrNocB)](https://codecov.io/gh/ghost-brigade/ghost-riders)

## How to use

Copy .env.example to .env

```
make init
make db
```

## Prisma

run migration

`npx prisma migrate dev --name init`

run seed

`npx prisma db seed`

reset database

`npx prisma migrate reset`
