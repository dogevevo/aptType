import mongoose, { Schema } from 'mongoose'
import { Posts } from 'types/PostTypes'


const PostSchema : Schema = new Schema<Posts> ( 

    { 
        title : { 
            type: String, 
        },
        description : { 
            type: String, 
        },
        content : { 
            type: String, 
        },
        featureImage : { 
            type: String, 
        },
        Author : { 
            type: String, 
        },
    }, { 
        timestamps: true, 
        versionKey: false
    }
)

export const PostsModel = mongoose.model<Posts>("Posts", PostSchema)