const DataSource = require('typeorm').DataSource;
console.log(process.env.TODOAPP_ENV);
require('dotenv').config({
  debug: true,
  path: `.env.${process.env.TODOAPP_ENV}`,
});

console.log(process.env.DB_HOST);
console.log(process.env.DB_PORT);
console.log(process.env.DB_USER_NAME);
console.log(process.env.DB_DATABASE);
module.exports = [
  new DataSource({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10),
    username: process.env.DB_USER_NAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: ['dist/**/*.model{.ts,.js}'],
    migrations: [
      `db/migrations/*.${
        process.env.TODOAPP_ENV === 'development' ? 'ts' : 'js'
      }`,
    ],
    synchronize: false,
    logging: false,
  }),
];
