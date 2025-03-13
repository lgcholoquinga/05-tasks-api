import { Response } from "types/response.interface";
import { ITaskRepository } from "types/tasks/itask.repository";
import { ITaskService } from "types/tasks/itask.service";
import { Task } from "types/tasks/task.interface";


export class TaskService implements ITaskService {
   private readonly taskRepository: ITaskRepository;

   constructor(taskRepository: ITaskRepository) {
      this.taskRepository = taskRepository;
   }

   findAllTasksByUser(id: string): Promise<Response<Task[]>> {
      return this.taskRepository.findAllById(id);
   }

   async createTask(task: Task): Promise<Response<Task>> {
      return this.taskRepository.create(task);
   }

   async findAllTasks(): Promise<Response<Task[]>> {
      return this.taskRepository.findAll();
   }

   async findOneTask(id: string): Promise<Response<Task | null>> {
      return this.taskRepository.findOne(id);
   }

   async updateTask(id: string, data: Partial<Task>): Promise<Response<Boolean>> {
      return this.taskRepository.update(id, { id, ...data });
   }

   async deleteTask(id: string): Promise<Response<Boolean>> {
      return this.taskRepository.delete(id);
   }
}