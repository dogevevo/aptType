import { PostsModel } from "@models/Posts";
import { InterfacePostsRepository, Posts } from "types/PostTypes";
import { Query } from "types/RepositoryTypes";



export class PostsRepository implements InterfacePostsRepository { 

    
    async create(data: Posts): Promise<Posts> {
        const newPosts = new PostsModel(data)
        return await newPosts.save(); 
    }

    async find(query ?: Query): Promise<Posts[]> {
        return await PostsModel.find(query || {}).exec()
    }

    async findById(id: string): Promise<Posts | null> {
        return await PostsModel.findById(id).exec();        
    }

    async update(id: string, data: Partial<Posts>): Promise<Posts | null> {
        return await PostsModel.findByIdAndUpdate(id, data, {new : true}).exec()
    }

    async delete(id: string): Promise<boolean> {
        const deleted = await PostsModel.findByIdAndDelete(id).exec(); 
        return deleted !== null; 
    }
}      