import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { AddTodoInput } from './dto/add_todo.dto';
import { DeleteTodoInput } from './dto/delete_todo.dto';
import { EditTodoInput } from './dto/edit_todo.dto';
import { Todo } from './todo.model';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo)
    private todosRepository: Repository<Todo>,
    private dataSouce: DataSource,
  ) {}

  findAll(): Promise<Todo[]> {
    return this.todosRepository.find();
  }

  findOneById(id: number): Promise<Todo> {
    return this.todosRepository.findOne({
      where: {
        todoId: id,
      },
    });
  }

  async createTodo(data: AddTodoInput): Promise<Todo> {
    const queryRunner = this.dataSouce.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    let todo: Todo;
    try {
      todo = this.todosRepository.create(data);
    } catch (err) {
      await queryRunner.rollbackTransaction();
    }
    await this.todosRepository.insert(todo);
    return todo;
  }

  async editTodo(data: EditTodoInput): Promise<Todo> {
    const queryRunner = this.dataSouce.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    let todo: Todo;
    try {
      todo = await this.findOneById(data.id);
      todo.title = data.title;
      todo.description = data.description;
      todo.status = data.status;
      todo.due = data.due;
      await this.todosRepository.save(todo);
      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
    }
    return todo;
  }

  async deleteTodo(data: DeleteTodoInput): Promise<boolean> {
    const result = await this.todosRepository.delete(data.id);
    return result.affected > 0;
  }
}
