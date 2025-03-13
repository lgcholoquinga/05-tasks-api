import { Task } from "./task.interface";
import { Response } from '../response.interface';

export interface ITaskService {
   createTask(task:Task): Promise<Response<Task>>;

   findAllTasks(): Promise<Response<Task[]>>;

   findOneTask(id:string): Promise<Response<Task | null>>;

   updateTask(id:string,data: Partial<Task> ): Promise<Response<Boolean>>;

   deleteTask(id:string): Promise<Response<Boolean>>;
}