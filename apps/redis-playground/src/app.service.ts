import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import type { Cache } from 'cache-manager'

@Injectable()
export class AppService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) { }

  async setCacheKey(key: string, value: string) {
    this.cacheManager.set(key, value);
  }

  async getCacheKey(key: string) {
    return this.cacheManager.get(key);
  }
}
