import express, { Express } from "express";
import { connectDB } from "./Config/dbConfig";
import { connectRedis } from "./Config/redisConfig";
import dotenv from "dotenv";
import faqRouter from "./Routes/faqRoutes";
import cors from "cors";

const PORT = process.env.PORT || 8000;
dotenv.config();

const app: Express = express();

//Database and Cache Conenction 
connectDB();
connectRedis();

//middleware
app.use(express.json());
app.use(cors({
    origin: ["http://localhost:3000"],
    credentials: true, 
}));

//Routes
app.use("/api", faqRouter);


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


export default app; 