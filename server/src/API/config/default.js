const path = require('path');
require('dotenv').config({ path: path.resolve('.env') });

module.exports = {
  database: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
  },
  email: {
    username: 'denis.zhidis@gmail.com',
    password: '1q2w3e1q2w3e',
  },
  secretKey: 'asdaasd',
  hostname: 'http://localhost:3000',
  identityServer: {
    host: 'http://localhost:5000',
    clientId: 'careerday_sunmait',
  },
};
