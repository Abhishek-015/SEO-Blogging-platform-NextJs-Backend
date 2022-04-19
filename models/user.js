const mongoose = require("mongoose");
const crypto = require("crypto");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      trim: true,
      required: true,
      max: 32,
      unique: true,
      index: true, //we will be making lot of database queries on the basis of username so thats why want to make it indexable
      lowercase: true,
    },
    name: {
      type: String,
      trim: true,
      required: true,
      max: 32,
    },
    name: {
      type: String,
      trim: true,
      required: true,
      max: 32,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      lowercase: true,
    },
    profile: {
      type: String,
      required: true,
    },
    hashed_password: {
      type: String,
      required: true,
    },
    //salt is basically use to strengthen the password and make it more strong by adding salt to it
    salt: String,
    about: {
      type: String,
    },
    role: {
      type: Number,
      trim: true,
    },
    photo: {
      data: Buffer, // we are going to save photo in binary data format and mongodb is perfect for saving binary data
      contentType: String, // photo can ibe in form of image.jpeg,image.png.......
    },
    //we will implement the forgot password and reset password functionality
    //at that we will generate the token and save it in the database and then we will email that token to the user, when the
    // user click on the link they will be redirected to react application and then from there react application will send the token back to
    //our server and then we check if that token is exactly one that we have in the data base
    resetPasswordLink: {
      data: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('User',userSchema)
