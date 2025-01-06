import { PostsRepository } from "@repositories/postsRepositories";
import { PostServices } from "@services/PostService";
import { Request, Response } from "express";
import { InterfacePostsRepository, InterfacePostsServices, Posts } from "types/PostTypes";


const postsRepository: InterfacePostsRepository = new PostsRepository();
const postService: InterfacePostsServices = new PostServices(postsRepository); 
 

export const findPosts = async (req : Request, res: Response) => {
    console.log("req :>> ", req.currentUser);

    try {

        const posts = await postService.findPosts(); 
        if(posts.length === 0) return res.status(404).json({message: 'post no found'})
        res.json(posts); 
        
    } catch (error) {
        console.log('error >>', error);
        res.status(500).json(error)
    }

}

export const findpostsById = async (req : Request, res: Response) => {

    try {

        const posts = await postService.findPostsById(req.params.id) 
        if(!posts) return res.status(404).json({message: 'not post found'})
        res.json(posts); 
        
    } catch (error) {
        console.log('error >>', error);
        res.status(500).json(error)
    }

}

export const createPost = async (req : Request, res: Response) => {

    try {

        const newPosts: Posts= req.body;
        const result = await postService.createPosts(newPosts); 
        
        res.status(201).json(result);  
        
    } catch (error) {
        console.log('error >>', error);
        res.status(401).json(error)
    }

}

export const updatePosts = async (req : Request, res: Response) => {

    try {

        const posts = await postService.updatePosts(req.params.id, req.body); 
        if(!posts) return res.status(404).json({message: 'not post found'})
        res.json(posts); 
        
    } catch (error) {
        console.log('error >>', error);
        res.status(500).json(error)
    }

}

export const deletePosts = async (req : Request, res: Response) => {

    try {

        const posts = await postService.deletePosts(req.params.id); 
        if(!posts) return res.status(404).json({message: 'not post found'})
        res.json(posts); 
        
    } catch (error) {
        console.log('error >>', error);
        res.status(500).json(error)
    }

}