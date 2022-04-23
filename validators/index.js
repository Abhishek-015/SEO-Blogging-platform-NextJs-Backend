const { validationResult } = require("express-validator");

exports.runValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array()[0].msg });  //errors.array()[0].msg ====> gives out the 1st error element present inside the error array wih status of 422(unprocessable entity)
  }
  next();
};
