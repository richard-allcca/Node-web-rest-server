import { Request, Response } from "express";
import { prisma } from "../../data/postgres";
import { CreateTodoDto } from "../../domain/dtos/todos/create-todo.dto";
import { UpdateTodoDto } from "../../domain/dtos/todos/update-todo.dto";
import { TodoRepository } from "../../domain/repository/todo.repository";

// TodoController con patron de diseño DDD - Usa directamente el repositorio
export class TodoController {

  constructor(
    private readonly todoRepository: TodoRepository
  ) {}

  public createTodo = async (req: Request, res: Response) => {

    const [error, createTodoDto] = CreateTodoDto.create(req.body);

    if (error) res.status(400).json({ error });

    try {
      const todo = this.todoRepository.create(createTodoDto!);
      res.status(201).json(todo);

    } catch (error) {
      res.status(400).json({ error });
    }
  };

  public getTodos = async (req: Request, res: Response) => {
    const todos = await this.todoRepository.getAll();
    res.json(todos);
  };

  public getTodoById = async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      res.status(400).json({ error: 'ID is not a number' });
    }

    try {
      const todo = await this.todoRepository.getById(id);
      res.json(todo);

    } catch (error) {
      res.status(404).json({error});
    }
  };

  public updateTodo = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const [error, updateTodoDto] = UpdateTodoDto.create({ ...req.body, id });

    if (error) res.status(400).json({ error });

    try {
      const newTodo = await this.todoRepository.updateById(updateTodoDto!)
      res.json(newTodo);

    } catch (error) {
      res.status(404).json({ error });
    }
  };

  public deleteTodo = async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      res.status(400).json({ error: 'ID is not a number' });
    }

    try {
      const deleted = await this.todoRepository.deleteById(id);
      res.json({deleted})

    } catch (error) {
      res.status(404).json({ error });
    }
  };
}