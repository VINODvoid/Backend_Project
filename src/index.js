// require("dotenv").config();  // ! It conflicts as we are using es6 import
import connectDB from "./db/index.js";
import dotenv from "dotenv";

dotenv.config(
    {
        path:"./env"
    }
);
connectDB();









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
