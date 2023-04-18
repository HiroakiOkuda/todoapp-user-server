import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Todo } from '../todos/todo.model';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IsOptional, IsString } from 'class-validator';

@Entity('users')
@ObjectType()
export class User {
  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  userId: number;

  @Field()
  @Column({ length: '50' })
  username: string;

  @Field()
  @Column({ length: '127' })
  email: string;

  @Field()
  @Column({ length: '50' })
  password: string;

  @Field()
  @CreateDateColumn()
  @IsOptional()
  createdAt?: Date | null;

  @Field()
  @CreateDateColumn()
  @IsOptional()
  updatedAt?: Date | null;

  @Field()
  @CreateDateColumn()
  @IsOptional()
  deletedAt?: Date | null;

  @Field()
  @Column()
  @IsString()
  hashedRefreshToken?: string;

  @OneToMany((type) => Todo, (todo) => todo.user, {
    createForeignKeyConstraints: false,
    persistence: false,
  })
  todos?: Todo[];
}
