import express, { Express } from "express";
import { connectDB } from "./Config/dbConfig";
import { connectRedis } from "./Config/redisConfig";
import dotenv from "dotenv";
import faqRouter from "./Routes/faqRoutes";

const PORT = process.env.PORT || 8000;
dotenv.config();

const app: Express = express();
connectDB();
connectRedis();

//middleware
app.use(express.json());
app.use("/api", faqRouter);


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


export default app; 