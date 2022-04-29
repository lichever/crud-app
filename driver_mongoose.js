const mongoose = require("mongoose");
const User = require("./User");
require("dotenv").config();

mongoose.connect(process.env.MONGODB_ATLAS_URI);

console.log(process.env.MONGODB_ATLAS_URI);
const db = mongoose.connection;

db.on("error", console.error.bind(console, "Error connecting to MongoDB:"));

// const user = new User({
//   name: "Chad",
//   age: 36,
//   hobbies: ["sleep", "study"],
//   email: "asdasda@gmail.com",
// });

// user
//   .save()
//   .then(() => {
//     console.log("user saved successfully");
//   })
//   .catch((e) => {
//     console.error(e.message);
//   });

run();
async function run() {
  try {
    // const user = await User.find({name: 'John'});
    // const users = await User.where("age").equals(36).skip(1).limit(2).populate("bestFriend");
    // const users = await User.findByName("JOHN");
    const users = await User.find().byName("JOHN");


    // users[0].bestFriend = "626b7d79e06b63af25c0957f"
    // await  users[0].save();
    users[0].sayHi();

    console.log(users[0].nameEmail);//virtual property in schema


    await users[0].save();

    console.log(users[0]);//virtual property in schema





  } catch (e) {
    console.log(e);
  }
}

// console.log(user);
