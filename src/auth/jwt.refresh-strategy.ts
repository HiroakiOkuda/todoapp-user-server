import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from '../users/user.model';
import { JwtPayload } from './jwt.types';
import { UsersService } from '../users/users.service';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(private readonly usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_REFRESH_SECRET,
    });
  }

  async validate(payload: JwtPayload): Promise<User | null> {
    const user = this.usersService.findOneByUsername(payload.username);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
