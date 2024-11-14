import { Request, Response } from "express";

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

  public createTodo = (req: Request, res: Response) => {
    const { title, description } = req.body;

    if (!title || !description) {
      res.status(400).json({ error: 'Title and description are required' });
    }

    const newTodo = {
      id: todos.length + 1,
      title,
      description,
      createAt: new Date()
    };

    todos.push(newTodo);

    res.status(201).json(newTodo);
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