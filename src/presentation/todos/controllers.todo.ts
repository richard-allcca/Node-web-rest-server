import { Request, Response } from "express";
import { CreateTodoDto } from "../../domain/dtos/todos/create-todo.dto";
import { UpdateTodoDto } from "../../domain/dtos/todos/update-todo.dto";
import { TodoRepository } from "../../domain/repository/todo.repository";
import { CreateTodo } from "../../domain/use-cases/todo/create-todo";
import { DeleteTodo } from "../../domain/use-cases/todo/delete-todo";
import { GetTodo } from "../../domain/use-cases/todo/get-todo";
import { GetTodos } from "../../domain/use-cases/todo/get-todos";
import { UpdateTodo } from './../../domain/use-cases/todo/update-todo';

/**
 * TodoController con casos de uso e inyección de dependencias (DI) - Usa casos de uso
 */
export class TodoController {

  constructor(
    private readonly todoRepository: TodoRepository
  ) {}

  public createTodo = (req: Request, res: Response) => {

    const [error, createTodoDto] = CreateTodoDto.create(req.body);

    if (error) res.status(400).json({ error });

    new CreateTodo(this.todoRepository)
    .execute(createTodoDto!)
    .then(todo => res.json(todo))
    .catch(error => res.status(404).json({ error }));

  };

  public getTodos = (req: Request, res: Response) => {

    new GetTodos(this.todoRepository)
    .execute()
    .then(todos => res.json(todos))
    .catch(error => res.status(404).json({ error }));

  };

  public getTodoById = (req: Request, res: Response) => {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      res.status(400).json({ error: 'ID is not a number' });
    }

    new GetTodo(this.todoRepository)
    .execute(id)
    .then(todo => res.json(todo))
    .catch(error => res.status(404).json({ error }))

  };

  public updateTodo = (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const [error, updateTodoDto] = UpdateTodoDto.create({ ...req.body, id });

    if (error) res.status(400).json({ error });

    new UpdateTodo(this.todoRepository)
    .execute(updateTodoDto!)
    .then(todo => res.json(todo))
    .catch(error => res.status(404).json({ error }));

  };

  public deleteTodo = (req: Request, res: Response) => {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      res.status(400).json({ error: 'ID is not a number' });
    }

    new DeleteTodo(this.todoRepository)
    .execute(id)
    .then(todo => res.json(todo))
    .catch(error => res.status(404).json({ error }));
  };
}