import { Request, Response, NextFunction } from "express";
import { client } from "../Config/redisConfig"; // Import Redis client

export const redisCacheMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { lang } = req.query;
  const cacheKey = `faqs:${lang}`;

  try {
    // Check if the data exists in Redis
    const cachedData = await client.get(cacheKey);
    if (cachedData) {
      console.log(`Cache hit for ${cacheKey}`);
      res.json(JSON.parse(cachedData)); // Send response
      return; // Ensure the function stops execution here
    }

    console.log(`Cache miss for ${cacheKey}, fetching from DB...`);
    next(); // Move to the controller
  } catch (err) {
    console.error("Error while checking Redis cache:", err);
    next(); // Proceed to the controller in case of error
  }
};