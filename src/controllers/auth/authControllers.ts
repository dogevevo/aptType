import { UserRepository } from "@repositories/userRepositories";
import { userServices } from "@services/userService";
import { Request, Response } from "express";
import { IUserRepository, IUserServices, User } from "types/UserTypes";
import jwt from "jsonwebtoken"

const userRepository: IUserRepository = new UserRepository();
const userService: IUserServices = new userServices(userRepository)

export const registerUsers = async (req : Request, res : Response) => { 
    try {
        const {email}: User = req.body; 
        const userExist = await userService.findUserByEmail(email)
        if(userExist) return res.status(400).json({ message : 'email already exist' });
        
        const newUser = await userService.createUser(req.body); 
        res.status(200).json(newUser); 

    } catch (error) {
        console.log('error : >>', error);
        res.status(500).json(error);
    }
}


export const loginUsers = async (req : Request, res : Response) => {
    const jwtSecret = process.env.JWT_SECRET as string 
    try {

        const {email, password}: User = req.body; 
        const user = await userService.findUserByEmail(email); 
        if(!user) return res.status(404).json({message : "invalid email or password "})
        
        const comparePass = await user.comparePassword(password);
        if(!comparePass) return res.status(404).json({message : "invalid email or password "})

        const token = jwt.sign({id: user._id, email: user.email, username: user.username}, jwtSecret, {expiresIn: "1d"}); 
        res.json(token)

    } catch (error) {
        console.log('error : >>', error);
        res.status(500).json(error);
    }
}
