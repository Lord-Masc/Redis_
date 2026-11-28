import { redisClient } from './redisClient.js';

function user(userId){
   return `otp:Yash${userId}`
}

//getOTP
const getOTP = async (userID) => {
   const key = user(userID);
    
    return await redisClient.get(key);
};



// Store otp

const saveOtp = async (userID, OTP) => {
    const key = user(userID);
    await redisClient.set(key, OTP, {
        EX: 15
    });
    console.log("OTP expires in 15 seconds");
};

// get otp expiry time

const getOTPExpiry = async (userID) => {
   const key = user(userID);

    return await redisClient.ttl(key);
    
};

export { getOTP, getOTPExpiry, saveOtp };
