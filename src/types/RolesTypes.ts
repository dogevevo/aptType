import { Repository } from "./RepositoryTypes";

export interface Roles {
    name: string; 
}

export interface InterfaceRolesRepository extends Repository<Roles> {}

export interface InterfaceRolesServices { 
    createRoles(roles : Roles): Promise<Roles>;
    findRoles(): Promise<Roles[]>
    findRolesById(id : string): Promise<Roles | null >
    updateRoles(id : string, roles : Partial<Roles>): Promise<Roles | null >
    deleteRoles(id : string): Promise<boolean>
}