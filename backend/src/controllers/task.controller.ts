import { Request, Response } from "express";
import { Task } from "../../models/Task";
export default class TaskController {
  async create(req: Request, res: Response) {
    try {
      await Task.create({key: Date.now(), ...req.body.task})
      const tasks = await Task.find({})
      res.status(201).json(tasks);
    } catch (err) {
      res.status(500).json({
        message: "Internal Server Error!"
      });
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const tasks = await Task.find({})
      res.status(200).json(tasks);
    } catch (err) {
      res.status(500).json({
        message: "Internal Server Error!"
      });
    }
  }

  async update(req: Request, res: Response) {
    try {
      console.log(req.body)
      await Task.findByIdAndUpdate(req.params.id, req.body.task);
      const tasks = await Task.find({})
      res.status(200).json(tasks);
    } catch (err) {
      res.status(500).json({
        message: "Internal Server Error!"
      });
    }
  }

  async delete(req: Request, res: Response) {
   
    try {
      await Task.findByIdAndDelete(req.params.id)
      const tasks = await Task.find({})
      res.status(200).json(tasks);
    } catch (err) {
      res.status(500).json({
        message: "Internal Server Error!"
      });
    }
  }
}
