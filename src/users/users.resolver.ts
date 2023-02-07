import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { RegisterInput } from './dto/register.dto';
import { User } from './user.model';
import { UsersService } from './users.service';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => User)
  @UseGuards(JwtAuthGuard)
  async getUserByEmail(@Args('args') args: string) {
    return this.usersService.findOneByEmail(args);
  }

  @Mutation(() => User, { nullable: true })
  async createUser(@Args('args') args: RegisterInput) {
    return this.usersService.createUser(args);
  }
}
