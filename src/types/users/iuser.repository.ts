import { Repository } from "types/respository.interface";
import { User } from "./user.interface";

export interface IUserRepository extends Repository<User> {}