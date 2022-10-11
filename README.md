# Ghost Rider

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