# Daily Diet API

## Getting Started

To run this project you must be using the Node.js on the version [v20.9.0](https://nodejs.org/dist/v20.9.0/) or greater.

Setups the environment variables on a `.env` file based on the [.env.example](.env.example) file.

Run the database migrations:

```shell
npm run knex -- migrate:latest
```

Run the server:

```shell
npm run dev
```

To run the test suit, you must create a `.env.test` file similar to the `.env` created earlier, however there is no need to define the `NODE_ENV` variable because it will be configured by Vitest. Then you can run the following command:

```shell
npm run test
```

## Requirements

### Business Rules

- [ ] Must be able to identify the user between requests;
- [ ] A meal must be related to an user;
- [ ] Users should only be able to see, edit and delete meals they register;

### Functional Requirements

- [ ] User must be able to register a meal (name, description, date and hour, if it is part of the diet);
- [ ] User must be able to update a meal;
- [ ] User must be able to delete a meal;
- [ ] User must be able to list all meals;
- [ ] User must be able to list a single meal;
- [ ] User must be able to retrieve a users metrics (total of registered meals, total of meals in the diet, total of non-dietary meals, best sequence of meals within the diet);
