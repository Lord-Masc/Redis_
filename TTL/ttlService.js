import { redisClient } from './redisClient.js';

//getOTP
const getOTP = async (userID) => {
    const key = `otp:${userID}`;
    
    return await redisClient.get(key);
};

// function userID(userId){
//    return `otp:${userID}`
// }

// Store otp

const saveOtp = async (userID, OTP) => {
    const key = `otp:${userID}`;
    await redisClient.set(key, OTP, {
        EX: 15
    });
    console.log("OTP expires in 15 seconds");
};

// get otp expiry time

const getOTPExpiry = async (userID) => {
    const key = `otp:${userID}`;

    return await redisClient.ttl(key);
    
};

export { getOTP, getOTPExpiry, saveOtp };
