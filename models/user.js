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
      default: 0,
    },
    photo: {
      data: Buffer, // we are going to save photo in binary data format and mongodb is perfect for saving binary data
      contentType: String, // photo can be in form of image.jpeg,image.png.......
    },
    //we will implement the forgot password and reset password functionality
    //at that we will generate the token and save it in the database and then we will email that token to the user, when the
    // user click on the link they will be redirected to react application and then from there react application will send the token back to
    //our server and then we check if that token is exactly one that we have in the database
    resetPasswordLink: {
      data: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

//we can even add methods and other functionality to our model schema like virtual field
//virtual field---> It is something like when we get password from client ,we are going to save hashed password in out database , so anything like virtual field
//doesnot persist in database , it is persist only here ,where we are defing it

//virtual field
userSchema
  .virtual("password")
  .set(function (password) {
    //create a temporary variable called _password
    this._password = password;

    //genearate salt that helps in hashing algo
    this.salt = this.makeSalt();

    //encrypt password
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function () {
    return this._password;
  });

//creating methods
userSchema.methods = {
  //authenticate method---> to compare password,whenever we get the plain password from the client we encrypt that plain password and compaare it with
  // hashed password stored in our data base ,if they match then we can authenticate succefully the uses during sisgin in process

  authenticate: function (plainPassword) {
    return this.encryptPassword(plainPassword) === this.hashed_password;
  },

  encryptPassword: function (password) {
    if (!password) return "";
    try {
      //encrypt password method
      return crypto
        .createHmac("sha1", this.salt)
        .update(password)
        .digest("hex");
    } catch (err) {
      return "";
    }
  },
  makeSalt: function () {
    return Math.round(new Date().valueOf() * Math.random()) + ""; //give us random numeric value
  },
};

module.exports = mongoose.model("User", userSchema);
