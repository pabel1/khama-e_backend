const mongoose = require("mongoose");
const userModel = mongoose.Schema({
  firstname: {
    type:String,
    required: true,
    maxLength: [30, "Name cannot exceed 30 characters"],
    minLength: [4, "Name should have more than 4 characters"],
  },
  lastname: {
    type:String,
    required: true,
    maxLength: [30, "Name cannot exceed 30 characters"],
    minLength: [4, "Name should have more than 4 characters"],
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minLength: [8, "Password should be greater than 8 characters"],
    select: false,
  },
  address: {
    type: String,
    required: true,
    
  },
  mobile: {
    type: String,
    required: true,
  },
  photo:{
      type:String,
      required:true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  __v: false,
});

const UserModel = mongoose.model("User", userModel);

module.exports = UserModel;