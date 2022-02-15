# Seed Phrase Authenticating
This is just a simple project for seed phrase authentication and is not implemented properly.

## Available Scripts

In the project directory, you can run:

### `npm run start`
Runs the app in the production mode by node runtime.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm run dev`
Runs the app in the development mode by nodemon.<br />
The project will reload if you make edits.

## Environment Variables
Variable must be placed in a file in the project root path, named `.env` and must contain these values:

```
MAINTENANCE_MODE = false
NODE_ENV = development
PORT = 3000
MONGODB_HOST = 127.0.0.1
MONGODB_PORT = 27017
MONGODB_DATABASE = seed-phrase-auth
JWT_SECRET = some_secret_phrase
```

## Dockerfile
You can build docker image of this project and database separately by executing Dockerfile in the project root and database directory.

## API Document and Environment
Project API and Environment for the Postman are in the docs directory and you can import them to the postman and use it.

## Word Bucket
In the beginning, you must add some words and save them in the database using `Add word API`, and the app will be using some random selection of those words to feed seed phrase functions.