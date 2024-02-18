// require("dotenv").config();  // ! It conflicts as we are using es6 import
import connectDB from "./db/index.js";
import dotenv from "dotenv";
import { app } from "./app.js";
dotenv.config(
    {
        path:"./env"
    }
);
connectDB()
.then( () => {
    app.listen(process.env.PORT || 8000 , () =>{
        console.log(`Server is running on port ${process.env.PORT}`);
    })
})
.catch((error) =>{
    console.log(" MongoDB Connection Failed ERROR !!! ", error);
    process.exit(1);
})


// * First Approach to connect to the database , start the server  and handle errors
/* const app = express();
(async ()=>{
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on("error", (error) =>{
            console.log("ERROR: ", error);
            throw error;
        })
        app.listen(process.env.PORT, () =>{
            console.log(`Server is running on port ${process.env.PORT}`);
        })
    } catch (error) {
        console.log("ERROR: ", error);
        throw error;
    }
})() */
