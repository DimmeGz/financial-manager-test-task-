## Installation

```bash
$ npm install
```

## Running the app in test mode

```bash
# run DB containers
$ docker-compose up

# run migrations
$ npm run typeorm:run

# Rename file ".env.test" to ".env"

# start app
$ npm run start
```
## Test

```bash
# unit tests
$ npm run test

# test coverage
$ npm run test:cov
```
