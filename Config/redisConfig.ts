import { createClient } from 'redis';

export const connectRedis = async () => {
    const client = createClient({
        username: process.env.REDIS_USERNAME,
        password: process.env.REDIS_PASSWORD,
        socket: {
            host: process.env.REDIS_HOST,
            port: Number(process.env.REDIS_PORT),
        },
    });

    client.on('connect', () => {
        console.log('Successfully connected to Redis');
    });

    client.on('error', (err: Error) => {
        console.log('Redis Client Error', err);
    });

    try {
        await client.connect();
    } catch (err) {
        console.error('Failed to connect to Redis:', err);
    }
};