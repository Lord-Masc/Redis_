import {createUser,updateUserRole,userFeild,getUser,delUser} from './userServices.js'

const user = {
    id:101,
    name:"Yash Verma",
    email:"y@gmail.com",
    role:"developer",
    age:21
}

// Create user
await createUser(user)
console.log("User Created");

// Reterieve user
console.log("\n--- Fetch User ---");
console.log(await getUser(101)); 

// Update user credential
await updateUserRole(101,"Backend-developer")
console.log("User after change the user credential");

console.log(await getUser(101));

// Delete one feild
await userFeild(101,"age")
console.log(`user after delete one feild ${
    await getUser(101)
}`);

//Delete entire user


console.log(`Delete the user ${
    user.name
}`);


