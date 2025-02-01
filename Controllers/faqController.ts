import { Request, Response } from "express";
import validator from 'validator';
import { translateData ,getFaqsByLanguage } from "../Services/faqService";
import { saveFaqs } from "../Repository/faqsRepo";

const addFaqs = async (req: Request, res: Response) => {
  const { question, answer } = req.body;


  // Validate Question and Answer length
  if (!validator.isLength(question, { min: 10 })) {
    return res.status(400).json({ error: 'Invalid Question format. Must be of Length greater than 10 characters.' });
  }
  if (!validator.isLength(answer, { min: 10 })) {
    return res.status(400).json({ error: 'Invalid Answer format. Must be of Length greater than 10 characters.' });
  }

  try {

    const createdFaqs = await translateData(question, answer); 

    await saveFaqs(createdFaqs);


    return res.status(201).json({ message: "FAQs created and saved successfully!" });
  }  catch (error) {
    const err = error as Error; 
    console.error("Error in creating FAQS:", {
        error: err.message || err,
        requestBody : req.body,
    });

    return res.status(500).json({ error: 'Internal Server Error' });
}
};

const getFaqs = async (req: Request, res: Response) => {

    const lang = (req.query.lang as string) || "en"; 
  
    try {

      const faqs = await getFaqsByLanguage(lang);
  
      if (faqs.length === 0) {
        return res.status(404).json({ message: "No FAQs found for the specified language" });
      }
  
      return res.status(200).json({ faqs });
    }catch (error) {
        const err = error as Error; 
        console.error("Error in Getting FAQS:", {
            error: err.message || err,
            requestBody : req.query,
        });
    
        return res.status(500).json({ error: 'Internal Server Error' });
    }
  };

module.exports = {
  addFaqs,
  getFaqs,
};