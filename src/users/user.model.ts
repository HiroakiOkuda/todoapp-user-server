import { TypeOrmTodoModel } from '../todos/todo.model';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('users')
export class TypeOrmUserModel {
  @PrimaryColumn()
  userId: number;

  @Column({ length: '50' })
  username: string;

  @Column({ length: '127' })
  email: string;

  @Column({ length: '50' })
  password: string;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date | null;

  @DeleteDateColumn()
  deletedAt?: Date | null;

  @Column()
  hashedRefreshToken?: string;

  @OneToMany((type) => TypeOrmTodoModel, (todo) => todo.user, {
    createForeignKeyConstraints: false,
    persistence: false,
  })
  todos?: TypeOrmTodoModel[];

  toUser() {
    return new User(
      this.userId,
      this.username,
      this.email,
      this.password,
      this.createdAt,
      this.updatedAt,
      this.deletedAt,
      this.hashedRefreshToken,
    );
  }
}
