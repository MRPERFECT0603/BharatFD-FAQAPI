import { Request, Response } from "express";
import validator from 'validator';
import { createFaq, getFaqsByLanguage } from "../Services/faqService";
import { client } from "../Config/redisConfig";

/**
 * Handles the creation of a new FAQ.
 * 
 * This function validates the `question` and `answer` fields to ensure they 
 * meet the minimum length requirement. If they pass validation, the FAQ is 
 * created and saved in the database. The function responds with a success 
 * message or an error message in case of failure.
 * 
 * @param req - The request object, containing the request body with the FAQ data.
 * @param res - The response object, used to send back the response to the client.
 * @returns A JSON response indicating success or failure.
 */
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
    const createdFaqs = await createFaq(question, answer); 

    return res.status(201).json({ message: "FAQs created and saved successfully!" + createdFaqs });
  } catch (error) {
    const err = error as Error; 
    console.error("Error in creating FAQS:", {
        error: err.message || err,
        requestBody: req.body,
    });

    return res.status(500).json({ error: 'Internal Server Error' });
  }
};


/**
 * Retrieves FAQs based on the specified language.
 * 
 * This function first checks if the requested FAQs are present in the 
 * Redis cache. If they are found, it returns the cached data. If not, 
 * it queries the database for the FAQs, saves them to the Redis cache, 
 * and then returns them. In case of an error or if no FAQs are found, 
 * it returns an appropriate error response.
 * 
 * @param req - The request object, containing query parameters like language.
 * @param res - The response object, used to send back the response to the client.
 * @returns A JSON response containing the FAQs or an error message.
 */
const getFaqs = async (req: Request, res: Response) => {

  const lang = (req.query.lang as string) || "en";
  const cacheKey = `faqs:${lang}`;

  try {

    const faqs = await getFaqsByLanguage(lang);


    if (faqs.length === 0) {
      return res.status(404).json({ message: "No FAQs found for the specified language" });
    }


    await client.set(cacheKey, JSON.stringify(faqs), { EX: 3600 });
    console.log(`Data cached in Redis for key: ${cacheKey}`);


    return res.status(200).json({ faqs });
  } catch (error) {

    console.error("Error in Getting FAQS:", { error });
    return res.status(500).json({ error: "Internal Server Error" });
  }
};


module.exports = {
  addFaqs,
  getFaqs,
};