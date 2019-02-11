# Sunmait career day

The "Sunmait career day" project is needed to improve the skills of employees. You can register and invite your employees, add career day for them with interview date and add tasks that they must meet by that date. The employee when sign in will see his active career day with an tasks and can edit task progress.

### Technologies

- [TypeScript]
- [React]
- [Redux]
- [NodeJS]
- [Express]
- [PostgreSQL]
- [Sequelize]
- [Jest]
- [Cypress]
- [Cucumber]

### Installation

To run project locally you need to install nodejs >=v8.11.1

After node installation clone project, you need to build client app. For that move to 'client' folder and run

```sh
npm i
npm run start
```

Next you need to run server, to do this read readme file in 'server' folder.

### Run project in the Docker

To run project in the Docker you need to install Docker and docker-compose

Then you need to configure the server and client to work in the Docker container. Configuration instructions can be found in [server](server/README.md#configuration-to-run-in-docker) and [client](client/README.md#configuration-to-run-in-docker) README files.

After that you can run following scripts from the project root folder.

```sh
npm run start       # Start project in production mode
npm run start-dev   # Start project in development mode
npm run build       # Rebuild and start project in production mode
npm run build-dev   # Rebuild and start project in development mode
```

---

[typescript]: https://www.typescriptlang.org/
[react]: https://reactjs.org/
[redux]: https://redux.js.org/
[nodejs]: https://nodejs.org/
[express]: https://expressjs.com/
[postgresql]: https://www.postgresql.org/
[sequelize]: http://docs.sequelizejs.com/
[jest]: https://facebook.github.io/jest/
[cypress]: https://www.cypress.io/
[cucumber]: https://cucumber.io/
