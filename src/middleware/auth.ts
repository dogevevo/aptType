import { UserRepository } from "@repositories/userRepositories";
import { userServices } from "@services/userService";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { IUserRepository, IUserServices, User } from "types/UserTypes";



const userRepository: IUserRepository = new UserRepository();
const userService: IUserServices = new userServices(userRepository)

export const verifyToken = async (req : Request, res : Response, next: NextFunction) => { 
    
    const jwtSecret = process.env.JWT_SECRET as string 
    const token = req.headers.authorization?.replace(/^Bearer\s+/, "") as string
    
    try {
        
        const verify = jwt.verify(token, jwtSecret ) as User
        const getUser = await userService.findUserById(verify.id); 
        if(!getUser) return res.status(400); 
        
        req.currentUser = getUser; 
        next()
        
    } catch (error : any) {
        console.log("error :>> ", error);
        res.status(401).send(error.message)
        
    }


}