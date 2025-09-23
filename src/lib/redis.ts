import { createClient, RedisClientType } from 'redis';

let redis: RedisClientType | null = null;

export async function getRedisClient(): Promise<RedisClientType | null> {
  if (!redis) {
    try {
      const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';

      redis = createClient({
        url: redisUrl,
        password: process.env.REDIS_PASSWORD || undefined,
        database: parseInt(process.env.REDIS_DB || '0'),
        socket: {
          connectTimeout: 10000,
        },
      });

      redis.on('error', (err) => {
        console.error('Redis connection error:', err);
        redis = null;
      });

      redis.on('connect', () => {
        console.log('✅ Redis connected successfully');
      });

      redis.on('disconnect', () => {
        console.log('Redis disconnected');
        redis = null;
      });

      await redis.connect();
    } catch (error) {
      console.error('❌ Failed to connect to Redis:', error);
      redis = null;
    }
  }

  return redis;
}

export async function testRedisConnection(): Promise<boolean> {
  try {
    const client = await getRedisClient();
    if (!client) return false;

    await client.ping();
    console.log('✅ Redis connection test successful');
    return true;
  } catch (error) {
    console.error('❌ Redis connection test failed:', error);
    return false;
  }
}

export async function disconnectRedis(): Promise<void> {
  if (redis) {
    await redis.disconnect();
    redis = null;
  }
}