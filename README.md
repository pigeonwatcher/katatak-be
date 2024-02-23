# Katatak Backend
## Project Summary
<i>Katatak</i> is a mobile app designed to help coders and developers practice their skills on a mobile device, completing coding exercises on their phones. This repo contains all the code required to run the application's back end server and API. Currently, the application only hosts coding exercises for Javascript.
## Tech Stack
This project has been coded in Typescript, as the front end of this application will be designed and deployed with React Native, which works best with Typescript. The PSQL database hosting the API's production data is hosted on ElephantSQL and deployed with Render. Jest has been implemented to carry out tests on user-submitted code from the front end.
## Hosted Demo
You can find a hosted demo of the API at [https://katatak.onrender.com/api/](https://katatak.onrender.com/api/). This homepage should respond with a detailed description of all the currently implemented endpoints and what data you can expect from them when invoked. It is being hosted on a free plan provided by Render, so it could take up to a minute to respond if the API hasn't been active.
## Running your own instance of this repo
### Cloning the Repo
This repo is public and can be forked and cloned from its [Github homepage](https://github.com/pigeonwatcher/katatak-be.git). Once you have cloned this repo, you will need to install a few Node dependencies and setup the environment variables before seeding the data.
### Required Node Dependencies
This repo was built using Node v20.11.1. It is recommended using this version to build and run the project locally.

You will need to initialise NPM from the root of the repo file structure and install the following package dependencies:
- dotenv (v16.4.5)
- express (v4.18.2)
- @types/express (v4.17.21)
- jest (v29.7.0)
- ts-jest (v29.1.2)
- pg (v8.11.3)
- pg-format (v1.0.4)
- typescript (v5.3.3)

Prior to seeding the data, you will need to install the following as a developer dependency:
- pg-format (v1.0.4)
- @babel/core (v7.23.9)
- @babel/preset-env (v7.23.9)
- @babel/preset-typescript (v7.23.3)
- @jest/globals (v29.7.0)
- @types/express (v4.17.21)
- @types/node (v20.11.19)
- babel-jest (v29.7.0)
- supertest (v6.3.4)
- ts-jest (v29.1.2)

### Configuring the Environment Variables
A test database and a development dtabase have been provided in this repository. To connect to and use these databases, you'll need to copy and paste the following code into their respective files at the root of the file structure:
#### env.test
`PGDATABASE=katatak_test`
#### env.development
`PGDATABASE=katatak`
## Seeding the Database
### Creating the Database
A script is provided for setting up the database (or, if need be, wiping it completely and starting again): this is `npm run setup-dbs` in your CLI. Be aware, if you run this script, it drops the database before creating it - you will need to seed data after running this command.
### Run the Seed Script
A seed script is provided for seeding the database - `npm run seed`. Unless you are running a test environment, it will default to seeding the development data. A jest testing suite is also provided in this package that has a seed script running before each test - it will seed the test data in this case.
## Testing Suite
This repo was tested using Jest v29.7.0. The Jest configuration has been made to account for Typescript as per the [Jest Documentation](https://jestjs.io/docs/getting-started#via-ts-jest) using `ts-jest`.
### Jest as a Dependency
This application uses Jest to test user submitted Javascript solutions, so it needs to be installed as a client-side dependency. It should be noted that whilst we would normally use `jest-sorted` to test the sorting of queries, it is not compatible with Typescript.
# Thank You
For exploring our little repo. We thought it was cool, and we hope you think so to. If you have any constructive feedback to provide, feel free to [raise an issue](https://github.com/pigeonwatcher/katatak-be/issues/new) directly on the Github page.