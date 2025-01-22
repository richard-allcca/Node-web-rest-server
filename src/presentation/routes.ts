import { Router } from "express";
import { TodoRoutes } from "./todos/routes.todo";


export class AppRoutes {

  static get routes(): Router {
    const routes = Router();

    routes.use('/api/todos', TodoRoutes.routes)

    return routes;
  }
}