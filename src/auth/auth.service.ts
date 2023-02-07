import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/user.model';
import { UsersService } from '../users/users.service';
// import * as bcrypt from 'bcrypt';
import { LoginResponse } from './dto/login-response.dto';
type PasswordOmitUser = Omit<User, 'password'>;

/**
 * @description Passwordでは出来ない認証処理をするクラス
 */
@Injectable()
export class AuthService {
  constructor(
    private usersServive: UsersService,
    private jwtService: JwtService,
  ) {}

  // userを認証する
  async validateUser(
    username: User['username'],
    password: User['password'],
  ): Promise<PasswordOmitUser | null> {
    const user = await this.usersServive.findOneByUsername(username);
    console.log(user);

    // DBに保存されているpasswordはハッシュ化されていることを想定し、bcryptを用いてpasswordを判定する
    if (user && password === user.password) {
      const { password, ...result } = user; // password情報を外部に出さないようにする
      return result;
    }
    return null;
  }

  // jwt tokenを返す
  async login(user: PasswordOmitUser): Promise<LoginResponse> {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload, { algorithm: 'RS256' }),
    };
  }
}
