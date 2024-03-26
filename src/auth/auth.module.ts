import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { AuthResolver } from './auth.resolver';
import { JwtRefreshStrategy } from './jwt.refresh-strategy';
import { UsersServiceModule } from '../users/users.service.module';
import { UserGqlDtoFactoryModule } from '../users/user.gql.dto.factory';

@Module({
  imports: [
    UsersServiceModule,
    UserGqlDtoFactoryModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({}),
  ],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    AuthResolver,
    JwtRefreshStrategy,
  ],
})
export class AuthModule {}
