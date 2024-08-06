<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>




# Building 🛠️


## Description

Personal project where I focus on learning new concepts, introducing microservices, docker, AWS, sockets, authentication, etc. The general idea with this project is to learn more and more by introducing myself to topics that I want to learn. In this case, a FullStack E-commerce for a pharmacy.

## Installation

```bash
$ pnpm install

#Nest CLI Installation
$ npm i -g @nestjs/cli
```

## Clone the .env.template file and rename the copy to .env

```
.env.template

.env <--
```

## Up database

```bash
# Docker
$ docker-compose up -d
```

## Running the app

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```


## Rebuild database

``` bash
# Seed
(building)
localhost:3000/v1/farma-store/seed

```


## Production Build

1. Create file ``.env.prod``
2. Fill environment variable
3. Create the new image 

```
docker-compose -f docker-compose.prod.yaml --env-file .env.prod up --build
```


## Test

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov


```



## Used Stack

1. ``PostgresDB``
2. ``Nestjs``
```
https://docs.nestjs.com/
https://www.postgresql.org/docs/
```




