import { Injectable } from '@nestjs/common';
import { Args } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegisterInput } from './dto/register.dto';
import { UpdateOneUserArgs } from './dto/update.dto';
import { User } from './user.model';

/**
 * @description User情報を扱うクラス
 */
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async findOneByEmail(email: string): Promise<User | undefined> {
    return await this.usersRepository.findOne({
      where: {
        email: email,
      },
    });
  }

  async findOneByUsername(
    username: User['username'],
  ): Promise<User | undefined> {
    return await this.usersRepository.findOne({
      where: {
        username,
      },
    });
  }

  async update(@Args() args: UpdateOneUserArgs): Promise<User> {
    const { username, email, password } = args;
    const updatedUser = {
      username,
      email,
      password,
    };
    return await this.usersRepository.save(updatedUser);
  }

  async registerUser(@Args() args: RegisterInput): Promise<User> {
    return await this.usersRepository.save(args);
  }
}
