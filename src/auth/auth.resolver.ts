import { UseGuards } from '@nestjs/common';
import { Resolver, Mutation, Context } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginResponse } from './dto/login-response.dto';
import { GqlAuthGuard } from './guards/gql-auth.guard';
import { JwtRefreshAuthGuard } from './guards/jwt-refresh-auth.guard';
import { User } from '../users/user.entity';

@Resolver(() => LoginResponse)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => LoginResponse)
  @UseGuards(GqlAuthGuard)
  async login(@Context() context): Promise<LoginResponse> {
    const user = new User(
      context.user.id,
      context.user.username,
      context.user.password,
      context.user.email,
    );
    return this.authService.login(user);
  }

  @Mutation(() => LoginResponse)
  @UseGuards(JwtRefreshAuthGuard)
  async refreshToken(@Context() context): Promise<LoginResponse> {
    return this.authService.refreshToken(
      context.req.user,
      context.req.headers.authorization,
    );
  }

  @Mutation(() => Boolean)
  @UseGuards(JwtRefreshAuthGuard)
  async logout(@Context() context): Promise<boolean> {
    return this.authService.logout(context.req.user);
  }
}
