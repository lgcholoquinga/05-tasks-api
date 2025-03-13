import { Response } from '../response.interface';
import { User } from './user.interface';

export interface IUserService {
   createUser(user:User): Promise<Response<User>>;

   findOneUser(email:string): Promise<Response<User | null>>;
}