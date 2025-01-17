import { RolesRepository } from "@repositories/rolesRepositories";
import { RolesServices } from "@services/RolesService";
import { NextFunction, Request, Response } from "express";
import { InterfaceRolesRepository, InterfaceRolesServices } from "types/RolesTypes";


const rolesRepository: InterfaceRolesRepository = new RolesRepository();
const rolesService: InterfaceRolesServices = new RolesServices(rolesRepository); 


export const checkRoles = async (req : Request, res : Response, next: NextFunction) => {
    
    // - Si no viene el role
    // - crear un role "user" por default
    
    const roles : string[] = req.body && req.body?.roles ? req.body.roles : []
    const role = Array.isArray(roles) && roles.length !== 0 ? roles : ["user"]
    console.log("request :>> ", role);
    
    try {
        
        // - si viene el role, revisar en la bd que ese role exista
        const findRoles = await rolesService.findRoles({name : { $in : role} })

        // - si el role no existe y retornamos un error.
        if(findRoles.length === 0) return res.status(404).send("role not found"); 
        // - si el role existe continuar
        
        req.body.roles = findRoles.map( x => x._id  )
        console.log("req.body.roles :>> ", req.body.roles);
        console.log("req.bodry :>> ", req.body);
        
        
        next(); 
        

    } catch (error) {
        console.log("error :>> ", error);
        res.status(500).json(error)
    }

 }
