import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import dotenv from "dotenv";
import { createClient } from "redis";

dotenv.config({
  path: resolve(dirname(fileURLToPath(import.meta.url)), "../.env"),
});

const redisClient = createClient({ url: process.env.REDIS_URL });

redisClient.on("error", (err) => {
  console.error("Redis client error:", err);
});

redisClient.on("connect", () => {
  console.log("Redis is connected");
});

redisClient.on("ready", () => {
  console.log("Redis is ready");
});

try {
  await redisClient.connect();
} catch (err) {
  console.error("Failed to connect to Redis:", err);
  process.exit(1);
}

export default redisClient;