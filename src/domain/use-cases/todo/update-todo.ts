
import { UpdateTodoDto } from "../../dtos/todos/update-todo.dto";
import { TodoEntity } from "../../entities/todo.entity";
import { TodoRepository } from '../../repository/todo.repository';



interface UpdateTodoDtoUseCase {
  execute( dto: UpdateTodoDto ): Promise<TodoEntity>
}

export class UpdateTodo implements UpdateTodoDtoUseCase {

  constructor(
    private readonly todoRepository: TodoRepository
  ) {}

  async execute( dto: UpdateTodoDto ): Promise<TodoEntity> {
    return this.todoRepository.updateById(dto);
  }
}