import { redisClient, connectRedis } from './redisClient.js';
import { getOTP, getOTPExpiry, saveOtp } from './ttlService.js';


async function main() {


    try {
        const user = "101"
        // connect redis server
        await connectRedis()

        // Save OTP for 101

        await saveOtp(user, "123456");

        // Read otp immediatly

        const otp = await getOTP(user);
        console.log("Retrieved OTP:", otp);

        //check TTl
        const otpExpiry = await getOTPExpiry(user)
        console.log("Remaining TTL:", otpExpiry, "seconds");

        await new Promise(resolve => setTimeout(resolve, 5000));

        // Check TTL again
        const remaining = await getOTPExpiry(user);
        console.log("TTL after 5 seconds:", remaining, "seconds");

        // Wait another 7 seconds
        await new Promise(resolve => setTimeout(resolve, 7000));

        // Try retrieving OTP after expiry
        const expiredOTP = await getOTP(user);
        console.log("OTP after expiry:", expiredOTP);
    }catch(err){
        console.log(err.message);
    }finally{
        if (redisClient.isOpen) {
            await redisClient.quit();
        }
    }


}

main();