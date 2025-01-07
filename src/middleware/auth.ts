import { UserRepository } from "@repositories/userRepositories";
import { userServices } from "@services/userService";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { IUserRepository, IUserServices, User } from "types/UserTypes";
import { permissions, Method } from "types/PermissionsTypes";



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


export const getPermissions = async (req : Request, res : Response, next: NextFunction) => { 
    // - Obtener lo roles, (desde currentUser)
    // - Obtener el Metodo HTTP de la petición
    const {currentUser, method, path} = req;
    const {roles} = currentUser;
    // console.log("path :>> ", path);
    console.log("currentUser :>> ", currentUser);


    // - Obtener el path/modulos (usuarios - roles - posts)
    const currentModule = path.replace(/^\/([^\/]+).*/, "$1");
    console.log("currentModule :>> ", currentModule);

    // - Conseguir en los permisos el metodo que coincida para obtener el objeto que contiene el scope
    const findMethod = permissions.find(x => x.method === Method[method as keyof typeof Method]);

    // - Armar el permiso correspondiente al scope en le momento de la petición
    if (!findMethod?.permissions.includes(`${currentModule}_${findMethod.scope}`)) {
        findMethod?.permissions.push(`${currentModule}_${findMethod.scope}`)
    }
    console.log("findMethod :>> ", findMethod);

    // - obtener todos los permisos de los roles del usuario
    // >> observacion : flat() es un metodo que nos permite aplanar un array de arrays
    // const rolesPermissions = roles?.map(x => x.permissions).flat();
    // const mergedPermissions = [new Set(rolesPermissions)]
    const mergedRolesPermissions = [...new Set(roles?.flatMap(roles => roles.permissions))]
    console.log("mergedRolesPermissions :>> ", mergedRolesPermissions);

    // - comparar los permisos armados en el scope con los permisos de los roles de usuario
    const permissionsGranted = findMethod?.permissions.find(roles => mergedRolesPermissions.includes(roles)); 
    console.log("permissionsGranted :>> ", permissionsGranted);
    
    

} 
