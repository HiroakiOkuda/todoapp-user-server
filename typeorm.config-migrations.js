const DataSource = require('typeorm').DataSource;

require('dotenv').config({
  debug: true,
  path: `.env.${process.env.TODOAPP_ENV}`,
});

module.exports = [
  new DataSource({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10),
    username: process.env.DB_USERNAME,
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
