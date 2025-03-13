import { Repository } from "types/respository.interface";
import { Task } from "./task.interface";

export interface ITaskRepository extends Repository<Task> {}