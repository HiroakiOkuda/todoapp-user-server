import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';
import { User } from '../users/user.entity';
type PasswordOmitUser = Omit<User, 'password'>;
/**
 * @description usernameとpasswordを使った認証処理を行うクラス
 */
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  // passport-localはデフォルトでusername, passwordをパラメータで受け取る
  async validate(
    username: string,
    password: string,
  ): Promise<PasswordOmitUser> {
    console.log(username);
    const user = this.authService.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException(); // 認証失敗
    }
    return user;
  }
}
