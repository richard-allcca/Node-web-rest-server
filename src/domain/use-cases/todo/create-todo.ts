import { CreateTodoDto } from "../../dtos/todos/create-todo.dto";
import { TodoEntity } from "../../entities/todo.entity";
import { TodoRepository } from "../../repository/todo.repository";


export interface CreateTotoUseCase {
  execute( dto: CreateTodoDto ): Promise<TodoEntity>
}

export class CreateTodo implements CreateTotoUseCase {

  constructor(
    private readonly todoRepository: TodoRepository
  ) {}

  async execute( dto: CreateTodoDto ): Promise<TodoEntity> {
    return this.todoRepository.create(dto);
  }
}