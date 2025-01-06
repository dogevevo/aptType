import { InterfacePostsRepository, InterfacePostsServices, Posts } from "types/PostTypes";
import { Query } from "types/RepositoryTypes";


export class PostServices implements InterfacePostsServices{ 
    private postsRepository: InterfacePostsRepository; 

    constructor(postsRepository : InterfacePostsRepository){ 
        this.postsRepository = postsRepository;
    }

    async createPosts(Posts: Posts): Promise<Posts> {
        return this.postsRepository.create(Posts)
    } 

    async findPosts(query ?: Query): Promise<Posts[]> {
        return this.postsRepository.find(query)
    }

    async findPostsById(id: string): Promise<Posts | null> {
        return this.postsRepository.findById(id)
    }

    async updatePosts(id: string, user: Partial<Posts>): Promise<Posts | null> {
        return this.postsRepository.update(id, user)
    }

    async deletePosts(id: string): Promise<boolean> {
        return this.postsRepository.delete(id)
    }

}