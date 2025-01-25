import { CreateTodoDto } from "../dtos/todos/create-todo.dto";
import { UpdateTodoDto } from "../dtos/todos/update-todo.dto";
import { TodoEntity } from "../entities/todo.entity";


export abstract class TodoDataSource {

  abstract create( createTodo: CreateTodoDto ): Promise<TodoEntity>;

  // TODO - Implement pagination
  abstract getAll(): Promise<TodoEntity[]>;

  abstract getById( id: number ): Promise<TodoEntity>;

  abstract updateById( updateTodoDto: UpdateTodoDto ): Promise<TodoEntity>;

  abstract deleteById( id: number ): Promise<TodoEntity>;
}