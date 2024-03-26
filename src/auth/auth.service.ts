import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/user.entity';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { LoginResponse } from './dto/login-response.dto';
import { Tokens } from './auth.types';
import { JwtPayload } from './jwt.types';
import { UserGqlDtoFactory } from '../users/user.gql.dto.factory';

/**
 * @description Passwordでは出来ない認証処理をするクラス
 */
@Injectable()
export class AuthService {
  constructor(
    private usersServive: UsersService,
    private jwtService: JwtService,
    @Inject('UserGqlDtoFactory')
    private readonly userGqlDtoFactory: UserGqlDtoFactory,
  ) {}

  // userを認証する
  async validateUser(
    username: User['username'],
    password: User['password'],
  ): Promise<User | null> {
    const user = await this.usersServive.findOneByUsername(username);
    console.log(user);

    // DBに保存されているpasswordはハッシュ化されていることを想定し、bcryptを用いてpasswordを判定する
    if (user && password === user.password) {
      return user;
    }
    return null;
  }

  // jwt tokenを返す
  async login(user: User): Promise<LoginResponse> {
    const tokens = await this.getTokens(user);
    await this.updateHashedRefreshToken(user, tokens.refresh_token);

    return {
      ...tokens,
      user: this.userGqlDtoFactory.create([user])[0],
    };
  }

  async refreshToken(
    user: User,
    authorization: string,
  ): Promise<LoginResponse> {
    const refreshToken = authorization.replace('Bearer', '').trim();

    if (!bcrypt.compareSync(refreshToken, user.hashedRefreshToken)) {
      throw new UnauthorizedException();
    }

    const tokens = await this.getTokens(user);
    await this.updateHashedRefreshToken(user, tokens.refresh_token);

    return {
      ...tokens,
      user: this.userGqlDtoFactory.create([user])[0],
    };
  }

  async logout(user: User): Promise<boolean> {
    // await this.usersServive.update({
    //   where: { id: user.userId },
    //   data: { hashedRefreshToken: { set: null } },
    // });

    return true;
  }

  async updateHashedRefreshToken(
    user: User,
    refreshToken: string,
  ): Promise<void> {
    const hashedRefreshToken = bcrypt.hashSync(refreshToken, 10);
    console.log(hashedRefreshToken);
  }

  async getTokens(user: User): Promise<Tokens> {
    const payload: JwtPayload = { username: user.username, sub: user.userId };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.JWT_SECRET,
        expiresIn: '15m',
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.JWT_REFRESH_SECRET,
        expiresIn: '7d',
      }),
    ]);

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }
}
