const baseDbConfig = {
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
};

module.exports = [
  {
    name: 'default',
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    ...baseDbConfig,
  },
  {
    name: 'reader',
    host: process.env.DB_HOST_READER,
    database: process.env.DB_DATABASE,
    ...baseDbConfig,
    synchronize: false,
  },
];
