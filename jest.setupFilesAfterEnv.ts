import 'reflect-metadata';
const redisPort = process.env.REDIS_PORT

beforeAll(async () => {
    if (!redisPort) {
        throw new Error('Redis port not set')
    }
    const redisOptions = {
        host: "redis",
        port: parseInt(redisPort),
    }

    Object.assign(global, {
        redisOptions,
    })
});