TODO-TEST
========

This is a technical test  to implement a working example API.


## Working locally

To work locally with this project just follow these steps

```
make setup
```

With this command you should have .env file with local variables, node modules installed and the database running with docker

Now you can run the project

```
npm run start
```

## Launch request locally

In api.http file there are examples for all endpoints in API 


## Development

For development I have used a small library to manage the dependency container, which offers me a good abstraction of the infrastructure part.

## Label external service

As requested in the test statement, I have decided to cache the request to the Labels API to depend as little as possible on the external service

## Testing

The tests have been developed with jest doing unit tests of several of the services

For run test

```
npm run test
```

100% coverage has not been reached, there are still some to be done

## Deploy

To build the docker image this command has been done
```
 make PORT=80 DATABASE_HOST=127.0.0.1 DATABASE_PORT=5432 DATABASE_USER=admin DATABASE_PASSWORD=pass DATABASE_NAME=admin build-app
```

It would be necessary to push the image to an image registry
