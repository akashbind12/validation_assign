const express = require("express");

const { body, validationResult } = require("express-validator");

const User = require("../models/user.model.js")

const router = express.Router();




router.post(
    "/",
    // body('username').isEmail(),
    body("email")
      .isEmail()
      .custom(async (value) => {
        const user = await User.findOne({ email: value });
  
        if (user) {
          throw new Error("Email is already taken");
        }
        return true;
      }),
    body("age")
      .not()
      .isEmpty()
      .withMessage("Age cannot be empty")
      .isNumeric()
      .withMessage("Age must be a number between 1 and 100")
      .custom((val) => {
        if (val < 1 || val > 100) {
          throw new Error("Incorrect age provided, age shoud be between 1 to 100");
        }
        return true;
      }),
    body("pincode").custom((value) => {
      if (value.length != 6) {
        throw new Error("pincode must be  6 characters");
      }
      return true;
    }),
    body("gender").custom((value) => {
        if (value == "Male" || value == "Female" || value == "Other" ) {
            return true;
        //   throw new Error("gender required & value should be Male, Female or Other");
        }
        throw new Error("gender required & value should be Male, Female or Other");
        // return true;
      }),
    async (req, res) => {
      try {
        const errors = validationResult(req);
        console.log({ errors });
        if (!errors.isEmpty()) {
          return res.status(400).send({ errors: errors.array() });
        }
  
        const user = await User.create(req.body);
  
        return res.status(201).send(user);
      } catch (err) {
        return res.status(500).send({ message: err.message });
      }
    }
  );
  
  module.exports = router;