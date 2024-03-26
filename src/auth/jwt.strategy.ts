import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { User } from '../users/user.entity';
import { UsersService } from '../users/users.service';
import { ConfigService } from '@nestjs/config';

// JwtについているPayload情報の型
interface JWTPayload {
  userId: User['userId'];
  username: User['username'];
}

/**
 * @description JWTの認証処理を行うクラス
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
  ) {
    super({
      // Authorization bearerからトークンを読み込む関数を返す
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // 有効期間を無視するかどうか
      ignoreExpiration: false,
      // envファイルから秘密鍵を取り出す
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  async validate(payload: JWTPayload): Promise<User | null> {
    return this.usersService.findOneByUsername(payload.username);
  }
}
