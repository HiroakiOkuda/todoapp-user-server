import { DataSource, DataSourceOptions } from 'typeorm';
export const dataSourceOptions: DataSourceOptions = {
  name: 'default',
  type: 'mysql',
  host: 'mysql',
  port: 3306,
  username: 'root',
  password: 'password',
  database: 'todoapp_dev',
  entities: ['dist/**/*.model.{ts,js}'],
  synchronize: true,
  logging: false,
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
