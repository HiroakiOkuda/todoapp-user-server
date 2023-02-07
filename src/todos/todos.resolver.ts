import { NotFoundException } from '@nestjs/common';
import { Args, Query, Resolver, Int, Mutation } from '@nestjs/graphql';
import { AddTodoInput } from './dto/add_todo.dto';
import { DeleteTodoInput } from './dto/delete_todo.dto';
import { EditTodoInput } from './dto/edit_todo.dto';
import { Todo } from './todo.model';
import { TodosService } from './todos.service';

@Resolver((of) => Todo)
export class TodosResolver {
  constructor(private todosService: TodosService) {}

  @Query((returns) => [Todo])
  todos(): Promise<Todo[]> {
    return this.todosService.findAll();
  }

  @Query((returns) => Todo)
  async getTodo(@Args({ name: 'id', type: () => Int }) id: number) {
    const todo = await this.todosService.findOneById(id);
    if (!todo) {
      throw new NotFoundException(id);
    }
    return todo;
  }

  @Mutation((returns) => Todo)
  createTodo(@Args('todo') todo: AddTodoInput): Promise<Todo> {
    return this.todosService.createTodo(todo);
  }

  @Mutation((returns) => Todo)
  editTodo(@Args('todo') todo: EditTodoInput): Promise<Todo> {
    return this.todosService.editTodo(todo);
  }

  @Mutation((returns) => Boolean)
  deleteTodo(@Args('todo') todo: DeleteTodoInput): Promise<boolean> {
    return this.todosService.deleteTodo(todo);
  }
}
