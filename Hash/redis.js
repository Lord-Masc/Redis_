import {createClient} from "redis"

const redisClient = createClient({
    url:process.env.REDIS_URL
})

redisClient.on("error",(err)=>{
    console.log("Error occured",err.message);
})

await redisClient.connect();
console.log("redis connect successfully");

export default redisClient 