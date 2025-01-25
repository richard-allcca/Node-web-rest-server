import { Router } from "express";
import { TodoController } from "./controllers.todo";
import { TodoDataSourceImpl } from "../../infrastructore/datasource/todo.datasource.impl";
import { TodoRepositoryImpl } from "../../infrastructore/repository/todo.repository.impl";

export class TodoRoutes {

  static get routes(): Router {
    const router = Router();

    const dataSourcePostgres = new TodoDataSourceImpl();
    const todoRepository = new TodoRepositoryImpl(dataSourcePostgres);

    const todoController = new TodoController(todoRepository);

    router.get('/', todoController.getTodos)
    router.get('/:id', todoController.getTodoById)
    router.post('/', todoController.createTodo)
    router.put('/:id', todoController.updateTodo)
    router.delete('/:id', todoController.deleteTodo)

    return router;
  }
}