Star Turkish Kebap

..::Install Next::..
$ npx create-next-app@latest ./
$ npm install next@latest react@latest react-dom@latest

-> Install dependencies
$ 

..::Neon config::..
- Create a new project
- create a new role
    ..::Temp Credentials::..
    - Role: bds
    - Password: 1Hr0RCvnGUEx
- create a new db linked to that role

..::PRISMA config::..
$ npm i -D prisma
$ npx prisma init
- Create the prisma schemas
$ npx prisma generate
$ npx prisma migrate dev
