import { Query } from "mongoose";
import { InterfaceRolesRepository, Roles, InterfaceRolesServices } from "types/RolesTypes";

export class RolesServices implements InterfaceRolesServices{ 
    private rolesRepository: InterfaceRolesRepository; 

    constructor(rolesRepository : InterfaceRolesRepository){ 
        this.rolesRepository = rolesRepository;
    }

    async createRoles(Roles: Roles): Promise<Roles> {
        return this.rolesRepository.create(Roles)
    }

    async findRoles(query ?: Query): Promise<Roles[]> {
        return this.rolesRepository.find(query)
    }

    async findRolesById(id: string): Promise<Roles | null> {
        return this.rolesRepository.findById(id)
    }

    async updateRoles(id: string, user: Partial<Roles>): Promise<Roles | null> {
        return this.rolesRepository.update(id, user)
    }

    async deleteRoles(id: string): Promise<boolean> {
        return this.rolesRepository.delete(id)
    }

}