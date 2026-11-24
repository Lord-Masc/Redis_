import {createClient} from 'redis';
import dotenv from 'dotenv';

dotenv.config();

const redisClient = new createClient({
    url:process.env.REDIS_URL
})

redisClient.on("error",(err)=>{
    console.err("Error occured..."+err.message)
})

redisClient.on("connect",()=>{
     console.log("Connecting to Redis...");
})

redisClient.on("ready",()=>{
    console.log("Redis is ready");
})

await redisClient.connect();

export default redisClient;