import express from "express";

const faqRouter = express.Router();

const {addFaqs , getFaqs } = require("../Controllers/faqController");


faqRouter.post("/faqs" , addFaqs);
faqRouter.get("/faqs", getFaqs);


 
export default faqRouter;
