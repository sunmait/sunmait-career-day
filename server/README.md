# Sunmait career day API server

### Installation

You need to have MySQL running on your local machine. MySQL server config file located in:

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

### Configuration to run in Docker

#### Development

To start the server in the docker container, you must correctly specify the **database configuration** in `API/config/default.json` and `migrations/config/config.json`.

By default, database config ​​should be equal to:

```json
"username": "root",
"password": "my_password",
"database": "sunmait_career_days_development",
"host": "sunmait-career-day-devdb",
"port": "3306"
```

These values ​​you can find in the `docker/docker-compose.dev.yml` file.
