const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 3, // Use 'minlength' instead of 'min'
    maxlength: 20, // Use 'maxlength' instead of 'max'
    unique: true,
    trim: true, // Automatically trims whitespace
  },
  email: {
    type: String,
    required: true,
    unique: true,
    maxlength: 50,
    lowercase: true, // Converts email to lowercase
    trim: true, // Removes leading and trailing spaces
  },
  contactNo: {
    type: String, // Changed to String to handle phone numbers correctly
    trim: true, // Removes leading and trailing spaces
    validate: {
      validator: function (v) {
        return /^\d{10}$/.test(v); // Optional: Simple validation for 10-digit phone numbers
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
  },
  role: {
    type: String,
    enum: ["admin", "mentor", "student", "startup"], // Corrected 'enum' spelling
    default: "student",
  },
  password: {
    type: String,
    required: true,
    minlength: 8, // Use 'minlength' instead of 'min'
  },
  isAvatarImageSet: {
    type: Boolean,
    default: false,
  },
  avatarImage: {
    type: String,
    default: "",
    trim: true, // Optional: Trims any unnecessary whitespace
  },
  lastMessage: {
    type: Date, // Date type for storing the last message timestamp
    default: Date.now, // Optional: Default to current time
  },
});

module.exports = mongoose.model("Users", userSchema);
