const path = require("path");
require("dotenv").config({
  path: path.resolve(__dirname, "..", "..", ".env"),
});

module.exports = {
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: "postgres",
  migrationStorageTableName: "SequelizeMetaCareerDay",
};
