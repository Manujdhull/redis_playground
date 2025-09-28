import { Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import Redis, { Redis as RedisClient } from 'ioredis';

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
    private client: RedisClient;
    onModuleInit() {
        this.client = new Redis({
            host: process.env.REDIS_HOST || undefined,
            port: Number(process.env.REDIS_PORT) || undefined,
            password: process.env.REDIS_PASSWORD || undefined,
            db: Number(process.env.REDIS_DB) || 0,
            retryStrategy(times) {
                return Math.min(times * 50, 2000);
            },
        })

        this.client.on('connect', () => console.log('Redis connected'));
        this.client.on('error', (err) => console.error('Redis error', err));
    }
    getClient(): RedisClient {
        return this.client;
    }

    async onModuleDestroy() {
        await this.client.quit();
    }
}