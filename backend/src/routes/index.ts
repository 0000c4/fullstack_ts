import { Application } from "express";
import TaskRoutes from "./task.routes";

export default class Routes {
  constructor(app: Application) {
    app.use("/api/tasks", TaskRoutes);
  }
}
