import { UserRepository } from "@repositories/userRepositories";
import { userServices } from "@services/userService";
import { Request, Response } from "express";
import { IUserRepository, IUserServices, User } from "types/UserTypes";


const userRepository: IUserRepository = new UserRepository();
const userService: IUserServices = new userServices(userRepository)

export const findUser = async (req : Request, res: Response) => {

    try {

        const users = await userService.findUser();
        if(users.length === 0) return res.status(404).json({message: 'users no found'})
        res.json(users); 
        
    } catch (error) {
        console.log('error >>', error);
        res.status(500).json(error)
    }

}

export const findUserById = async (req : Request, res: Response) => {

    try {

        const user = await userService.findUserById(req.params.id); 
        if(!user) return res.status(404).json({message: 'not user found'})
        res.json(user); 
        
    } catch (error) {
        console.log('error >>', error);
        res.status(500).json(error)
    }

}

export const createUser = async (req : Request, res: Response) => {

    try {

        const newUser: User = req.body;
        const result = await userService.createUser(newUser); 
        
        res.status(201).json(result);  
        
    } catch (error) {
        console.log('error >>', error);
        res.status(401).json(error)
    }

}

export const updateUser = async (req : Request, res: Response) => {

    try {

        const user = await userService.updateUser(req.params.id, req.body);
        if(!user) return res.status(404).json({message: 'not user found'})
        res.json(user); 
        
    } catch (error) {
        console.log('error >>', error);
        res.status(500).json(error)
    }

}

export const deleteUser = async (req : Request, res: Response) => {

    try {

        const user = await userService.deleteUser(req.params.id);
        if(!user) return res.status(404).json({message: 'not user found'})
        res.json(user); 
        
    } catch (error) {
        console.log('error >>', error);
        res.status(500).json(error)
    }

}