import mongoose, { Schema } from 'mongoose'
import { User } from 'types/UserTypes'
import bcript from 'bcrypt'

const UserSchema : Schema = new Schema<User> ( 

    { 
        name : { 
            type: String, 
            required: true
        }, 
        username : { 
            type: String, 
            required: true, 
            unique: true
        },
        email : { 
            type: String, 
            required: true,
            unique: true
        },
        password : { 
            type: String, 
            require: true, 
            trim: true
        }
    }, { 
        timestamps: true, 
        versionKey: false
    }
)


UserSchema.pre<User>("save", async function( next ){
    if (this.isModified("password") || this.isNew ) {
        const salt = await bcript.genSalt(12); 
        const hash = await bcript.hash(this.password, salt)
        this.password = hash
     }

     next(); 
})

UserSchema.method("comparePassword", async function(password : string): Promise<boolean>{ 
    return await bcript.compare(password, this.password as string); 
})

UserSchema.methods.toJSON = function(){
    const userObject = this.toObject(); 
    delete userObject.password;
    return userObject
}

export const UserModel = mongoose.model<User>("User", UserSchema)
