const User = require("../models/user");
const shortId = require("shortid");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");



exports.signup = (req, res) => {
  // checking if user already exist
  User.findOne({ email: req.body.email }).exec((err, user) => {
    if (user) {
      return res.status(400).json({
        error: "Email is already taken",
      });
    }

    // if User not exist lets create it
    const { name, email, password } = req.body;
    let username = shortId.generate();
    let profile = `${process.env.CLIENT_URL}/profile/${username}`; //generate profile URL

    //creating new User
    let newUser = new User({ name, email, password, profile, username });
    newUser.save((err, success) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      res.json({
        //   user:success
        message: "Signup success! Please signin",
      });
    });
  });
};

exports.signin = (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email }).exec((err, user) => {
    // check if user exist
    if (err || !user) {
      return res.status(400).json({
        error: "User with that email does not exist. Please signup first",
      });
    }
    //authenticate email and password
    if (!user.authenticate(password)) {
      return res.status(400).json({
        error: "Email and Password do not exist",
      });
    }

    //generate a jwt(includes userid and secret ) and send it to client
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    //saving above token in cookies as well
    res.cookie("token", token, { expiresIn: "1d" });

    //sending token and user as response to client
    const { _id, username, name, email, role } = user;
    return res.json({
      token,
      user: { _id, username, name, email, role },
    });
  });
};

exports.signout = (req, res) => {
  res.clearCookie("token");
  res.json({
    message: "Signout successfully",
  });
};

//creating a middleware ---> To protected the routes
//when user id logged in and it refresh that url ,then at that time this middleware check the secret coming from client side
// and compare it with secret stored in our env file,if this matches and the token doesnot expired then this middleware return true and user will have excess to it
//This middleware not only just check the expiry of token but also makes make user available in req object by default

exports.requireSignin = expressJwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
});

exports.authMiddleWare = (req, res, next) => {
  const authUserId = req.user._id;
  User.findById({ _id: authUserId }).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User not found",
      });
    }
    req.profile = user;
    next();
  });
};

exports.adminMiddleWare = (req, res, next) => {
  const adminUserId = req.user._id;
  User.findById({ _id: adminUserId }).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User not found",
      });
    }
    if(user.role !== 1){
      return res.status(400).json({
        error: "Admin resource. Access denied",
      });
    }
    req.profile = user;
    next();
  });
};

