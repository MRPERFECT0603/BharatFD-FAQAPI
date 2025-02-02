import { createClient } from 'redis';




export const client = createClient({
  username: process.env.REDIS_USERNAME, 
  password: process.env.REDIS_PASSWORD,
  socket: {
    host: process.env.REDIS_HOST || "redis-10568.crce179.ap-south-1-1.ec2.redns.redis-cloud.com",
    port: Number(process.env.REDIS_PORT) ||  10568,
  },
});
client.on("connect", () => {
    console.log(`Successfully connected to Redis at ${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`);
    console.log(`Username: ${process.env.REDIS_USERNAME}`);
  });

client.on('error', (err: Error) => {
  console.log('Redis Client Error', err);
});


export const connectRedis = async () => {
  try {
    await client.connect();
  } catch (err) {
    console.error('Failed to connect to Redis:', err);
  }
};