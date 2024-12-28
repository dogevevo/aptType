import { Router } from "express";
import { createRoles, deleteRoles, findRoles, findRolesById, updateRoles } from "@controllers/rolesController";
import { createUser, deleteUser, findUser, findUserById, updateUser } from "@controllers/userController";
import { loginUsers, registerUsers } from "@controllers/auth/authControllers";

const router = Router(); 

export default () => { 

    router.get("/healty", (req, res) => { 
        res.send('api is Healty!!!')
    })

    //Auth router
    router.post("/auth/register", registerUsers);
    router.post("/auth/login", loginUsers);


    //user router
    router.get("/users", findUser);
    router.get("/users/:id", findUserById);
    router.post("/users", createUser);
    router.put("/users/:id", updateUser);
    router.delete("/users/:id", deleteUser);


    //roles router
    router.get("/roles", findRoles)
    router.get("/roles/:id", findRolesById)
    router.post("/roles", createRoles)
    router.put("/roles/:id", updateRoles)
    router.delete("/roles/:id", deleteRoles)

    return router
}
