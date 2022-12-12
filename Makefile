init:
	npm install
	npm run prepare

db:
	npx prisma migrate dev --name init
	npx prisma db seed

run:
	npm run dev

test:
	npm run test