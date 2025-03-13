import { Response } from "types/response.interface";
import { IUserRepository } from "types/users/iuser.repository";
import { IUserService } from "types/users/iuser.service";
import { User } from "types/users/user.interface";

export class UserService implements IUserService {
   private readonly userRepository: IUserRepository;

   constructor(userRepository: IUserRepository) {
      this.userRepository = userRepository;
   }

   async createUser(user: User): Promise<Response<User>> {
      return this.userRepository.create(user);
   }

   async findOneUser(email:string): Promise<Response<User | null>> {
      return this.userRepository.findOne(email);
   }
}