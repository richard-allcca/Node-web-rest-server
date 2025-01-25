import { prisma } from "../../data/postgres";
import { TodoDataSource } from "../../domain/datasources/todo.datasource";
import { CreateTodoDto } from '../../domain/dtos/todos/create-todo.dto';
import { UpdateTodoDto } from "../../domain/dtos/todos/update-todo.dto";
import { TodoEntity } from "../../domain/entities/todo.entity";


export class TodoDataSourceImpl extends TodoDataSource {

  private todos: TodoEntity[] = [];

  async create( createTodo: CreateTodoDto ): Promise<TodoEntity> {
    const [error, createTodoDto] = CreateTodoDto.create(createTodo);

    if (error) throw new Error(error);

    const todo = await prisma.todo.create({
      data: createTodoDto!
    });

    return TodoEntity.fromObject(todo);
  }

  async getAll(): Promise<TodoEntity[]> {
    const todos = await prisma.todo.findMany();
    return todos.map(todo => TodoEntity.fromObject(todo));
  }

  async getById( id: number ): Promise<TodoEntity> {
    const todo = await prisma.todo.findUnique({
      where: {
        id
      }
    });

    if (!todo) throw new Error('Todo not found');

    return TodoEntity.fromObject(todo);
  }

  async updateById( updateTodoDto: UpdateTodoDto ): Promise<TodoEntity> {
    await this.getById(updateTodoDto.id);

    const todo = await prisma.todo.update({
      where: {
        id: updateTodoDto.id
      },
      data: updateTodoDto.values
    });

    return TodoEntity.fromObject(todo);
  }

  async deleteById( id: number ): Promise<TodoEntity> {
    await this.getById(id);

    const todo = await prisma.todo.delete({
      where: {
        id: id
      }
    });

    return TodoEntity.fromObject(todo);
  }

}