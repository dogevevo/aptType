import { UserRepository } from "@repositories/userRepositories";
import { userServices } from "@services/userService";
import { Router } from "express";
import { IUserRepository, IUserServices, User } from "types/UserTypes";

const router = Router(); 

const userRepository: IUserRepository = new UserRepository();
const userService: IUserServices = new userServices(userRepository)

export default () => { 

    router.get("/healty", (req, res) => { 
        res.send('api is Healty!!!')
    })

    router.get("/users", async(req, res) => { 
        const users = await userService.findUser(); 
        res.json(users); 
    })

    router.post("/users", async(req, res) => { 
        const newUser: User = req.body;
        const result = await userService.createUser(newUser); 

        res.json(result); 
    })

    return router
}
