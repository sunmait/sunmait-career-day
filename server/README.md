# Sunmait career day API server

### Installation

To run server locally install nodejs version >= 8.6.0.
Also you need to have MySQL running on your local machine. MySQL server config file located in:

```sh
/API/config/default.example
```
create your own 'default.json' with your data.
Also you need to create a database with name "sunmait_career_days_development".

Installation all dependencies:

```sh
npm run install-all
```

#### Creating tables and filling them with test data (Migrations)

Configuration file located in:

```sh
/migrations/config.example
```
create your own 'config.json' with your data.

Next, to create tables you need run:

```sh
npm run migrate
```

and then for filling tables with test data run:

```sh
npm run seed
```

To undo migrate, run:

```sh
npm run migrate:undo
```

for seed run:

```sh
npm run seed:undo
```

#### Running server

To start the server run

```sh
npm start
```
