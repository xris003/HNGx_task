const mongoose = require("mongoose");
const validator = require("validator");

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your name"],
  },

  email: {
    type: String,
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Enter a valid email"],
  },

  age: {
    type: Number,
    max: [100, "You are too old!"],
    // validate: [validator.Number, "Names Only!"],
    default: 18,
  },
});

const Person = mongoose.model("Person", personSchema);

module.exports = Person;
