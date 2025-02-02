import express from "express";

const faqRouter = express.Router();

const {addFaqs , getFaqs } = require("../Controllers/faqController");
import {redisCacheMiddleware }from "../Middlewares/redisMiddleware";

faqRouter.post("/faqs" , addFaqs);
faqRouter.get("/faqs", redisCacheMiddleware ,getFaqs);


 
export default faqRouter;
