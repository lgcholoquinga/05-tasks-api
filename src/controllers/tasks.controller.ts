import { Request, Response } from "express";

import { TaskRepository } from "@repositories/task-repository";
import { TaskService } from "@services/task.service";

import { ITaskRepository } from "types/tasks/itask.repository";
import { ITaskService } from "types/tasks/itask.service";

const taskRepository: ITaskRepository = new TaskRepository();
const taskService: ITaskService = new TaskService(taskRepository);

const getAllTasks = async(_req:Request, res:Response) => {
   const response = await taskService.findAllTasks()
   res.json(response);
}

const getAllTasksByUser = async(req:Request, res:Response) => {
   const response = await taskService.findAllTasksByUser(req.params.id)
   res.json(response);
}

const getTaskById = async(req:Request, res:Response) => {
   const response = await taskService.findOneTask(req.params.id);
   res.json(response);
}

const createTask = async(req:Request, res:Response) => {
   const userId = req.headers.email;
   const response = await taskService.createTask(req.body);
   res.json(response);
}

const updateTask = async(req:Request, res:Response) => {
   const response  = await taskService.updateTask(req.params.id,req.body);
   res.json(response)
}

const deleteTask = async(req:Request, res:Response) => {
   const response = await taskService.deleteTask(req.params.id);
   res.json(response);
}

export {
   getAllTasks,
   createTask,
   updateTask,
   deleteTask,
   getTaskById,
   getAllTasksByUser
}