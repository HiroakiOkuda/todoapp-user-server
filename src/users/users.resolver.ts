import {
  Args,
  ArgsType,
  Field,
  Mutation,
  Query,
  Resolver,
} from '@nestjs/graphql';
import { RegisterInput } from './dto/register.dto';
import { UsersService } from './users.service';
import { Inject, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UserGqlDtoFactory } from './user.gql.dto.factory';
import { UserGqlDto } from './user.gql.dto';
import { UpdateOneUserArgs } from './dto/update.dto';
import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';

@ArgsType()
export class GetUserByEmailArgs {
  @Field()
  @IsNotEmpty()
  @IsEmail()
  @IsString()
  @MaxLength(127)
  email: string;
}
@Resolver(() => UserGqlDto)
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService,
    @Inject('UserGqlDtoFactory')
    private readonly usersFactory: UserGqlDtoFactory,
  ) {}

  @Query(() => UserGqlDto, { nullable: true })
  @UseGuards(JwtAuthGuard)
  async getUserByEmail(@Args() args: GetUserByEmailArgs) {
    try {
      const user = await this.usersService.findOneByEmail(args.email);
      return this.usersFactory.create([user])[0];
    } catch (error) {
      return null;
    }
  }

  @Mutation(() => UserGqlDto, { nullable: true })
  async registerUser(@Args() args: RegisterInput): Promise<UserGqlDto> {
    try {
      const newUser = await this.usersService.registerUser(args);
      return this.usersFactory.create([newUser])[0];
    } catch (error) {
      return null;
    }
  }

  @Mutation(() => UserGqlDto, { nullable: true })
  async updateUser(@Args() args: UpdateOneUserArgs): Promise<UserGqlDto> {
    try {
      const updatedUser = await this.usersService.updateUser(args);
      return this.usersFactory.create([updatedUser])[0];
    } catch (error) {
      throw new Error(error);
    }
  }
}
