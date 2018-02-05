# Sunmait career day API server

### Installation

To run server locally install nodejs version >= 8.6.0.
Also you need to have MySQL running on your local machine on 3306 port and
a database was created with name "sunmait_career_days_development".

Installation all dependencies:

```sh
npm run install-all
```

#### Creating tables and filling them with test data

To create tables you need navigate to 'migrations' folder.

There run

```sh
../node_modules/.bin/sequelize db:migrate
```

and then for filling tables with test data run

```sh
../node_modules/.bin/sequelize db:seed:all
```

To undo this, run

```sh
../node_modules/.bin/sequelize db:migrate:undo:all
```

#### Running server

To start the server, in the 'server' folder, run

```sh
npm start
```
