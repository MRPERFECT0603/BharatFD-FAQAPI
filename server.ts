
import express, { Express} from "express";
import { connectDB } from "./Config/dbConfig";
import dotenv from "dotenv";


const PORT = process.env.PORT || 8000;
dotenv.config();

const app:Express = express();
connectDB();

//middleware
app.use(express.json());



app.listen(PORT , ()=>{
                    console.log(`Server is running on http://localhost:${PORT}`);
});