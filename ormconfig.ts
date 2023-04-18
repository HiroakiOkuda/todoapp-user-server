import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import { Todo } from './src/todos/todo.model';
import { User } from './src/users/user.model';
import { DataSource } from 'typeorm';

export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (): Promise<TypeOrmModuleOptions> => {
    return {
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [Todo, User],
      migrations: [
        `db/migrations/*.${process.env.ENV === 'local' ? 'ts' : 'js'}`,
      ],
      synchronize: false,
      logging: false,
    };
  },
};

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [Todo, User],
  migrations: [`db/migrations/*.${process.env.ENV === 'local' ? 'ts' : 'js'}`],
  synchronize: false,
  logging: false,
};

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [Todo, User],
  migrations: [`db/migrations/*.${process.env.ENV === 'local' ? 'ts' : 'js'}`],
  synchronize: false,
  logging: false,
});
