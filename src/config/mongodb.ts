import mongoose from "mongoose";
import dotenv from "dotenv"; 

dotenv.config(); 

const MongodbURL = process.env.MONGO_DB_STRING as string; 

export default ( async() => {
    try {
        await mongoose.connect(MongodbURL); 
        console.log('database conneted !!!');
        
    } catch (error) {
        console.log("error >>> " , error);
        process.exit(1)
    }
})()