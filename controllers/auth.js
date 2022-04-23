const User = require("../models/user");
const shortId = require("shortid");

exports.signup = (req, res) => {
  // checking if user already exist
  User.findOne({ emal: req.body.email }).exec((err, user) => {
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
    console.log("newUser---->",newUser)
    newUser.save((err, success) => {
      if (err)
        return res.status(400).json({
          error: err,
        });
      res.json({
          user:success
        // message: "SignUp Success! Please signIn",
      });
    });
  });
};

//generating username automatically for user during sign up for first time
