import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodosModule } from './todos/todos.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { ConnectionOptionsReader } from 'typeorm';

const ENV = process.env.TODOAPP_ENV;

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      sortSchema: true,
      cors: {
        origin: true,
        credentials: true,
      },
      playground: ENV === 'development',
      fieldResolverEnhancers: ['interceptors'],
    }),
    ConfigModule.forRoot({
      envFilePath: !ENV ? '.env.development' : `.env.${ENV}`,
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      name: 'reader',
      useFactory: async () => new ConnectionOptionsReader().get('reader'),
    }),
    TypeOrmModule.forRootAsync({
      name: 'default',
      useFactory: async () => new ConnectionOptionsReader().get('default'),
    }),
    TodosModule,
    AuthModule,
    UsersModule,
  ],
  providers: [
    {
      provide: 'port',
      useValue: process.env.TODOAPP_LISTEN_PORT?.toString(),
    },
  ],
})
export class AppModule {}
