import { TodoDataSource } from "../../domain/datasources/todo.datasource";
import { CreateTodoDto } from "../../domain/dtos/todos/create-todo.dto";
import { UpdateTodoDto } from "../../domain/dtos/todos/update-todo.dto";
import { TodoEntity } from "../../domain/entities/todo.entity";
import { TodoRepository } from "../../domain/repository/todo.repository";



export class TodoRepositoryImpl implements TodoRepository {

  constructor(
    private readonly todoDataSource: TodoDataSource
  ) {}


  create(createTodo: CreateTodoDto): Promise<TodoEntity> {
    return this.todoDataSource.create(createTodo);
  }
  getAll(): Promise<TodoEntity[]> {
    return this.todoDataSource.getAll();
  }
  getById(id: number): Promise<TodoEntity> {
    return this.todoDataSource.getById(id);
  }
  updateById(updateTodoDto: UpdateTodoDto): Promise<TodoEntity> {
    return this.todoDataSource.updateById(updateTodoDto);
  }
  deleteById(id: number): Promise<TodoEntity> {
    return this.todoDataSource.deleteById(id);
  }

}