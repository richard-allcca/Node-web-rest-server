import { Request, Response } from "express";
import { prisma } from "../../data/postgres";
import { CreateTodoDto } from "../../domain/dtos/todos/create-todo-.dto";
import { UpdateTodoDto } from "../../domain/dtos/todos/update-todo.dto";

export class TodoController {

  constructor() {
    console.log("TodoController");
  }

  public getTodos = async (req: Request, res: Response) => {
    const allTodos = await prisma.todo.findMany();
    res.json(allTodos);
  };

  public getTodoById = async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      res.status(400).json({ error: 'ID is not a number' });
    }

    const todo = await prisma.todo.findUnique({
      where: {
        id: id
      }
    });

    if (!todo) {
      res.status(404).json({ error: `Todo with id ${id} not found` });
    }

    res.json(todo);
  };

  public createTodo = async (req: Request, res: Response) => {

    const [error, createTodoDto] = CreateTodoDto.create(req.body);

    if (error) res.status(400).json({ error });

    const todo = await prisma.todo.create({
      data: createTodoDto!
    });

    res.status(201).json(todo);
  };

  public updateTodo = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const [error, updateTodoDto] = UpdateTodoDto.create({ ...req.body, id });

    if (error) res.status(400).json({ error });

    const todo = prisma.todo.findFirst({
      where: { id }
    });

    if (!todo) {
      res.status(404).json({ error: `Todo with id ${id} not found` });
    }

    const updatedTodo = await prisma.todo.update({
      where: {
        id: id
      },
      data: updateTodoDto!?.values
    });

    res.json(updatedTodo);
  };

  public deleteTodo = async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      res.status(400).json({ error: 'ID is not a number' });
    }

    const todo = prisma.todo.findFirst({
      where: {
        id: id
      }
    });

    if (!todo) {
      res.status(404).json({ error: `Todo with id ${id} not found` });
    }

    const deleted = await prisma.todo.delete({
      where: {
        id: id
      }
    });

    (deleted)
      ? res.json({deleted})
      : res.status(404).json({ error: `Todo with id ${id} not found` });
  };
}