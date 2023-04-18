import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
// import { AuthController } from './auth.controller';
import { ConfigService } from '@nestjs/config';
import { AuthResolver } from './auth.resolver';
import { JwtRefreshStrategy } from './jwt.refresh-strategy';

@Module({
  imports: [
    UsersModule,
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
