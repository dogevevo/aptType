import { createUser, deleteUser, findUser, findUserById, updateUser } from "@controllers/userController";
import { RolesRepository } from "@repositories/rolesRepositories";
import { RolesServices } from "@services/RolesService";
import { Router } from "express";
import { InterfaceRolesRepository, InterfaceRolesServices } from "types/RolesTypes";
import { IUserRepository, IUserServices, User } from "types/UserTypes";

const router = Router(); 



const rolesRepository: InterfaceRolesRepository = new RolesRepository();
const rolesService: InterfaceRolesServices = new RolesServices(rolesRepository)

export default () => { 

    router.get("/healty", (req, res) => { 
        res.send('api is Healty!!!')
    })

    //user router
    router.get("/users", findUser);
    router.get("/users/:id", findUserById);
    router.post("/users", createUser);
    router.put("/users/:id", updateUser);
    router.delete("/users/:id", deleteUser);


    //roles router
    router.get("/roles", async(req, res) => { 
        const roles = await rolesService.findRoles(); 
        res.json(roles); 
    })

    router.get("/roles/:id", async(req, res) => { 
        const roles = await rolesService.findRolesById(req.params.id); 
        res.json(roles); 
    })

    router.post("/roles", async(req, res) => { 
        const newUser: User = req.body;
        const result = await rolesService.createRoles(newUser); 

        res.json(result); 
    })

    router.put("/roles/:id", async(req, res) => { 
        const roles = await rolesService.updateRoles(req.params.id, req.body); 
        res.json(roles); 
    })

    router.delete("/roles/:id", async(req, res) => { 
        const roles = await rolesService.deleteRoles(req.params.id); 
        res.json(roles); 
    })

    return router
}
