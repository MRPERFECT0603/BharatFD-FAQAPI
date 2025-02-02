import { Request, Response, NextFunction } from "express";
import { client } from "../Config/redisConfig"; 


export const redisCacheMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { lang } = req.query;
  const cacheKey = `faqs:${lang}`;

  try {
    const cachedData = await client.get(cacheKey);
    if (cachedData) {
      console.log(`Cache hit for ${cacheKey}`);
      res.json(JSON.parse(cachedData)); 
      return;
    }

    console.log(`Cache miss for ${cacheKey}, fetching from DB...`);
    next(); 
  } catch (err) {
    console.error("Error while checking Redis cache:", err);
    next(); 
  }
};