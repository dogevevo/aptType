import { RolesRepository } from "@repositories/rolesRepositories";
import { RolesServices } from "@services/RolesService";
import { Request, Response } from "express";
import { InterfaceRolesRepository, InterfaceRolesServices, Roles } from "types/RolesTypes";



const rolesRepository: InterfaceRolesRepository = new RolesRepository();
const rolesService: InterfaceRolesServices = new RolesServices(rolesRepository)

export const findRoles = async (req : Request, res: Response) => {

    try {

        const roles = await rolesService.findRoles(); 
        if(roles.length === 0) return res.status(404).json({message: 'users no found'})
        res.json(roles); 
        
    } catch (error) {
        console.log('error >>', error);
        res.status(500).json(error)
    }

}

export const findRolesById = async (req : Request, res: Response) => {

    try {

        const roles = await rolesService.findRolesById(req.params.id) 
        if(!roles) return res.status(404).json({message: 'not user found'})
        res.json(roles); 
        
    } catch (error) {
        console.log('error >>', error);
        res.status(500).json(error)
    }

}

export const createRoles = async (req : Request, res: Response) => {

    try {

        const newRole: Roles= req.body;
        const result = await rolesService.createRoles(newRole); 
        
        res.status(201).json(result);  
        
    } catch (error) {
        console.log('error >>', error);
        res.status(401).json(error)
    }

}

export const updateRoles = async (req : Request, res: Response) => {

    try {

        const roles = await rolesService.updateRoles(req.params.id, req.body); 
        if(!roles) return res.status(404).json({message: 'not user found'})
        res.json(roles); 
        
    } catch (error) {
        console.log('error >>', error);
        res.status(500).json(error)
    }

}

export const deleteRoles = async (req : Request, res: Response) => {

    try {

        const roles = await rolesService.deleteRoles(req.params.id); 
        if(!roles) return res.status(404).json({message: 'not user found'})
        res.json(roles); 
        
    } catch (error) {
        console.log('error >>', error);
        res.status(500).json(error)
    }

}