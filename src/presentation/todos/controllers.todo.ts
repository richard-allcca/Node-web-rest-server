import { Request, Response } from "express";
import { prisma } from "../../data/postgres";

const todos = [
  { id: 1, title: 'Todo 1', description: 'Description 1', createAt: new Date() },
  { id: 2, title: 'Todo 2', description: 'Description 2', createAt: new Date() },
  { id: 3, title: 'Todo 3', description: 'Description 3', createAt: new Date() }
];

export class TodoController {

  constructor() {
    console.log("TodoController");
  }

  public getTodos = (req: Request, res: Response) => {
    res.json(todos);
  };

  public getTodoById = (req: Request, res: Response) => {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      res.status(400).json({ error: 'ID is not a number' });
    }

    const todo = todos.find(todo => {
      return todo.id === id
    })

    if (!todo) {
      res.status(404).json({ error: `Todo with id ${id} not found` });
    }

    res.json(todo);
  };

  public createTodo = async (req: Request, res: Response) => {
    const { title, description } = req.body;

    const todo = await prisma.todo.create({
      data: {
        text: title,
        completedAt: new Date()
      }
    });

    if (!title || !description) {
      res.status(400).json({ error: 'Title and description are required' });
    }

    res.status(201).json(todo);
  };

  public updateTodo = (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const { title, description } = req.body;

    if (isNaN(id)) {
      res.status(400).json({ error: 'ID is not a number' });
    }

    const todo = todos.find(todo => {
      return todo.id === id
    })

    if (!todo) {
      res.status(404).json({ error: `Todo with id ${id} not found` });
    }

    todo!.title = title;
    todo!.description = description;

    res.json(todo);
  };

  public deleteTodo = (req: Request, res: Response) => {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      res.status(400).json({ error: 'ID is not a number' });
    }

    const todo = todos.find(todo => {
      return todo.id === id
    })

    if (!todo) {
      res.status(404).json({ error: `Todo with id ${id} not found` });
    }

    todos.splice(todos.indexOf(todo!), 1);

    res.json(todo);
  };
}