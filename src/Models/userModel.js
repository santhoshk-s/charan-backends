const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 20,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    maxlength: 50,
    lowercase: true,
    trim: true,
  },
  age: {
    type: String,
  },
  gender: {
    type: String,
  },
  contactNo: {
    type: String,
    trim: true,
    validate: {
      validator: function (v) {
        return /^\d{10}$/.test(v); // Validating 10-digit phone numbers
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
  },
  role: {
    type: String,
    enum: ["admin", "mentor", "student", "startup"], // Defines specific user roles
    default: "student",
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  isAvatarImageSet: {
    type: Boolean,
    default: false,
  },
  avatarImage: {
    type: String,
    default: "",
    trim: true,
  },
  lastMessage: {
    type: Date,
    default: Date.now,
  },
  // Additional fields for role-specific details
  startupPersonName: {
    type: String,
    required: function () {
      return this.role === "startup";
    },
    trim: true,
  },
  industry: {
    type: String,
    required: function () {
      return this.role === "startup";
    },
    trim: true,
  },
  qualification: {
    type: String,
    required: function () {
      return this.role === "mentor";
    },
    trim: true,
  },
  fieldOfMentorship: {
    type: String,
    required: function () {
      return this.role === "mentor";
    },
    trim: true,
  },
});

module.exports = mongoose.model("Users", userSchema);
