import { Field, ID, ObjectType, Int } from '@nestjs/graphql';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { User } from '../users/user.model';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';

@Entity('todos')
@ObjectType()
export class Todo {
  @PrimaryGeneratedColumn()
  @Field((type) => ID)
  @IsNumber()
  readonly todoId: number;

  @Column({ length: '50' })
  @Field()
  @IsString()
  title: string;

  @Column({ length: '10000' })
  @Field()
  @IsOptional()
  @IsString()
  description?: string | null;

  @Column({ type: 'int', unsigned: true })
  @Field((type) => Int)
  @IsNumber()
  status: number;

  @Column()
  @Field()
  @IsOptional()
  due?: Date | null;

  @CreateDateColumn()
  @Field()
  @IsOptional()
  createdAt?: Date | null;

  @CreateDateColumn()
  @Field()
  @IsOptional()
  updatedAt?: Date | null;

  @CreateDateColumn()
  @Field()
  @IsOptional()
  deletedAt?: Date | null;

  @ManyToOne(() => User, (user) => user.todos)
  user?: User;
}
