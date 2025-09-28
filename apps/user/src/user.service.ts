import { Injectable } from '@nestjs/common';
import { RedisService } from '../../../libs/redis/redis.service';

@Injectable()
export class UserService {
  constructor(private readonly redisService: RedisService) { }
  async getUser(id: string) {
    const client = this.redisService.getClient();
    const cacheKey = `user:${id}`;

    const cached = await client.get(cacheKey);
    if (cached) return JSON.parse(cached);

    // simulate DB call
    const user = { id, name: 'John Doe' };

    await client.set(cacheKey, JSON.stringify(user), 'EX', 60);

    return user;
  }
}
