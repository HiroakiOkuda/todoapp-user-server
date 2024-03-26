import { Inject, NotFoundException } from '@nestjs/common';
import { Args, Query, Resolver, Int, Mutation } from '@nestjs/graphql';
import { CreateTodoInput } from './dto/create_todo.dto';
import { DeleteTodoInput } from './dto/delete_todo.dto';
import { UpdateTodoInput } from './dto/update_todo.dto';
import { TodosCreateService } from './services/todos.create.service';
import { TodosAccessService } from './services/todos.access.service';
import { TodosUpdateService } from './services/todos.update.service';
import { TodosDeleteService } from './services/todos.delete.service';
import { TodoGqlDto } from './todo.gql.dto';
import { TodoGqlDtoFactory } from './todo.gql.dto.factory';

@Resolver(() => TodoGqlDto)
export class TodosResolver {
  constructor(
    private readonly todosCreateService: TodosCreateService,
    private readonly todosAccessService: TodosAccessService,
    private readonly todosDeleteService: TodosDeleteService,
    private readonly todosUpdateService: TodosUpdateService,
    @Inject('TodoGqlDtoFactory')
    private readonly todosFactory: TodoGqlDtoFactory,
  ) {}

  @Query((returns) => [TodoGqlDto])
  async getTodos(@Args({ name: 'id', type: () => Int }) id: number) {
    const todo = await this.todosAccessService.findTodos({ id });
    if (!todo) {
      throw new NotFoundException(id);
    }
    return this.todosFactory.create(todo);
  }

  @Mutation((returns) => TodoGqlDto)
  async createTodo(@Args() todo: CreateTodoInput): Promise<TodoGqlDto> {
    const newTodo = await this.todosCreateService.createTodo(todo);
    return this.todosFactory.create([newTodo])[0];
  }

  @Mutation((returns) => TodoGqlDto)
  async updateTodo(@Args() todo: UpdateTodoInput): Promise<TodoGqlDto> {
    const updatedTodo = await this.todosUpdateService.updateTodo(todo);
    return this.todosFactory.create([updatedTodo])[0];
  }

  @Mutation((returns) => Boolean)
  async deleteTodo(@Args() todo: DeleteTodoInput): Promise<boolean> {
    return await this.todosDeleteService.deleteTodo(todo);
  }
}
