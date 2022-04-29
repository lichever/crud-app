const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  street: String,
  city: String,
});

//validation only run create and save methods
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    lowercase: true,
  },
  age: {
    type: Number,
    min: 1,
    max: 200,
  },

  email: {
    type: String,
    minlength: 10,
    validate: {
      validator: (str) => str.includes("@"), // func return true/false
      message: (props) => `${props.value} is not valid email`,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  bestFriend: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
  }, // refer to another user  model->"User"
  hobbies: [String],
  address: addressSchema,
});

//add instance methods (almost useless)
userSchema.methods.sayHi = function () {
  console.log(`my name is ${this.name}`);
}; //cannot use arrow function because we need this

//add static method (custom query  useful)
userSchema.statics.findByName = function (name) {
  return this.find({ name: new RegExp(name, "i") }); //no chain
};

//add query which is not a function and must be after a function like find(), where()
//query vs static level
userSchema.query.byName = function (name) {
  return this.where({ name: new RegExp(name, "i") }); //chainable
};

//add virtual property
userSchema.virtual("nameEmail").get(function () {
  return `${this.name} -- <${this.email}>`;
});


//add middleware  pre / post
//save, validate, remove
userSchema.pre('save', function (next){
    this.createdAt = Date.now();
    next();
})

userSchema.post('save', function (savedDocument, next){
    savedDocument.sayHi();
    next();
})

module.exports = mongoose.model("User", userSchema);
