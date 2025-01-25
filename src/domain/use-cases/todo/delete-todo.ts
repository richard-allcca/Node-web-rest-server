import { TodoEntity } from "../../entities/todo.entity";
import { TodoRepository } from "../../repository/todo.repository";


interface DeleteTodoUseCase {
  execute( id: number ): Promise<TodoEntity>
}

export class DeleteTodo implements DeleteTodoUseCase {

  constructor(
    private readonly todoRepository: TodoRepository
  ) {}

  async execute( id: number ): Promise<TodoEntity> {
    return this.todoRepository.deleteById(id);
  }
}