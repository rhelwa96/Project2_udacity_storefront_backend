# Udacity Project Storefront Backend

## Set up Database

- Connect Default postgres username `psql -U postgres`
- In psql,  Create Dev & test database 
    - `CREATE DATABASE storetest;`
    - `CREATE DATABASE storelive;`


## Set up env
- add a `.env` file in the root directory 
```
POSTGRES_HOST=127.0.0.1
POSTGRES_DB=storelive
POSTGRES_DB_TEST=storetest
POSTGRES_USER=postgres
POSTGRES_PASSWORD=1578
POSTGRES_PORT=5432
PORT=3000
NODE_ENV=dev
BCRYPT_PASSWORD=rin-flashh-run
SALT_ROUNDS=10
TOKEN_SECRET=token-secret
```

## Set up project
- `npm install` to install all dependencies
- `npm run build` to build the app

## Start the app
- `npm run dev` to start the app and get access via http://127.0.0.1:3000

## Ports
-  Backends app runs on port 3000 with database on 5432.


## Test the app
- `npm run test` to run all tests