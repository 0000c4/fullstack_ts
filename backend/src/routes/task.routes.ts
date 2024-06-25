import { Router } from "express";
import TaskController from "../controllers/task.controller";

class TaskRoutes {
  router = Router();
  controller = new TaskController();

  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes() {
    // Create a new task
    this.router.post("/", this.controller.create);

    // Retrieve all tasks
    this.router.get("/", this.controller.findAll);

    // Update a task with id
    this.router.put("/:id", this.controller.update);

    // Delete a task with id
    this.router.delete("/:id", this.controller.delete);
  }
}

export default new TaskRoutes().router;
