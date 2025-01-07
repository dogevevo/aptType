import { Router } from "express";
import { createRoles, deleteRoles, findRoles, findRolesById, updateRoles } from "@controllers/rolesController";
import { createPost, deletePosts, findPosts, findpostsById, updatePosts } from "@controllers/postsController";
import { createUser, deleteUser, findUser, findUserById, updateUser } from "@controllers/userController";
import { loginUsers, registerUsers } from "@controllers/auth/authControllers";
import { getPermissions, verifyToken } from "middleware/auth";
import { checkRoles } from "middleware/roles";

const router = Router(); 

export default () => { 

    router.get("/healty", (req, res) => { 
        res.send('api is Healty!!!')
    })

    //Auth router
    router.post("/auth/register",checkRoles, registerUsers);
    router.post("/auth/login", loginUsers);


    //user router
    router.get("/users",verifyToken, findUser);
    router.get("/users/:id",verifyToken, findUserById);
    router.post("/users",verifyToken, checkRoles, createUser);
    router.put("/users/:id",verifyToken, updateUser);
    router.delete("/users/:id",verifyToken, deleteUser);


    //roles router
    router.get("/roles",verifyToken, findRoles)
    router.get("/roles/:id",verifyToken, findRolesById)
    router.post("/roles",verifyToken, createRoles)
    router.put("/roles/:id",verifyToken, updateRoles)
    router.delete("/roles/:id",verifyToken, deleteRoles)

    //post router
    router.get("/posts", findPosts)
    router.get("/posts/:id", findpostsById)
    router.post("/posts",verifyToken, getPermissions ,createPost)
    router.put("/posts/:id",verifyToken,getPermissions, updatePosts)
    router.delete("/posts/:id",verifyToken, deletePosts)

    return router
}
