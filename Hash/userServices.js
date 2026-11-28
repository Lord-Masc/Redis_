import redisClient from './redis.js'

const userKey = (userId) => `user:${userId}`;

export async function createUser(user){
    await redisClient.hSet(userKey(user.id),{
        name : user.name,
        email:user.email,
        role:user.role,
        age:String(user.age)
    })

    console.log("User stored successfully");
}

export async function getUser(userId) {
    const user = await redisClient.hGetAll(userKey(userId))

    if (Object.keys(user).length === 0) {
    return null;
  }

  return user;
}


//update a single feild
export async function updateUserRole(userId,role) {
    await redisClient.hSet(userKey(userId),"role", role)
    console.log("Update user feild sucessfully")
}

export async function userFeild (userId,feild){
    await redisClient.hDel(userKey(userId),feild)
    console.log(`${feild} deleted successfully`);
} 

// delete entire user
export async function delUser(userId){
    await redisClient.del(userKey(userId))
    console.log("User deleted successfully");
}
