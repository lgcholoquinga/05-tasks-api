import { Response } from "./response.interface";

export interface Repository<T = unknown> {
   create(data: T): Promise<Response<T>>;

   findAll(): Promise<Response<T[]>>;

   findOne(id:string): Promise<Response<T | null>>;

   update(id: string, data:Partial<T>): Promise<Response<Boolean>>;

   delete(id:string): Promise<Response<Boolean>>;

   findAllById(id:string): Promise<Response<T[]>>;
}