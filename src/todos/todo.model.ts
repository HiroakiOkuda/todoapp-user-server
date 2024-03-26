import { TypeOrmUserModel } from '../users/user.model';
import {
  Entity,
  Column,
  CreateDateColumn,
  ManyToOne,
  UpdateDateColumn,
  DeleteDateColumn,
  JoinColumn,
  PrimaryColumn,
} from 'typeorm';
import { Todo } from './todo.entity';

@Entity('todos')
export class TypeOrmTodoModel {
  @PrimaryColumn()
  todoId: number;

  @Column({ length: '50' })
  title: string;

  @Column({ length: '10000' })
  description?: string;

  @Column({ type: 'int', unsigned: true })
  status: number;

  @Column()
  due?: Date;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  @DeleteDateColumn()
  deletedAt?: Date;

  @ManyToOne(() => TypeOrmUserModel)
  @JoinColumn({ name: 'user_id' })
  user: TypeOrmUserModel;

  toTodo() {
    return new Todo(
      this.todoId,
      this.title,
      this.description,
      this.status,
      this.due,
      this.createdAt,
      this.updatedAt,
      this.deletedAt,
    );
  }
}
