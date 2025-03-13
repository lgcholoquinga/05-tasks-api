import { UserRepository } from "@repositories/user.repository";
import { UserService } from "@services/user.service";
import { Request, Response } from "express";
import { IUserRepository } from "types/users/iuser.repository";
import { IUserService } from "types/users/iuser.service";

const userRepository: IUserRepository = new UserRepository();
const userService: IUserService = new UserService(userRepository);

export const create = async(req:Request, res:Response) => {
   const response = await userService.createUser(req.body);
   res.json(response);
}

export const findOne = async(req:Request, res:Response) => {
   const response = await userService.findOneUser(req.params.email);
   res.json(response);
}