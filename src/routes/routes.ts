import { Router } from "express";

const router = Router(); 

export default () => { 

    router.get("/healty", (req, res) => { 
        res.send('api is Healty!!!')
    })

    return router
}
