// import { AuthGuard } from '@nestjs/passport';
// import { Controller, Post, Request, UseGuards } from '@nestjs/common';
// import { User } from '../users/user.model';
// import { AuthService } from './auth.service';

// type PasswordOmitUser = Omit<User, 'password'>;

// @Controller()
// export class AuthController {
//   constructor(private readonly authService: AuthService) {}

//   @UseGuards(AuthGuard('local')) // passport-local strategyを付与する
//   @Post('login')
//   async login(@Request() req: { user: PasswordOmitUser }) {
//     // LocalStrategy.validate()で認証して返した値がreq.userに入っている
//     // JwtTokenを返す
//     return this.authService.login(req.user);
//   }
// }
