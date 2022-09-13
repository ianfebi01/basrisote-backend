const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const {
  validateEmail,
  validateLenght,
  validateUsername,
} = require("../helpers/validation");
const { generateToken } = require("../helpers/tokens");

exports.register = async (req, res) => {
  try {
    const { first_name, last_name, email, password, username } = req.body;
    // check email format
    if (!validateEmail(email)) {
      return res.status(400).json({ message: "Invalid email address." });
    }
    // check email on db
    const check = await User.findOne({ email });
    if (check) {
      return res.status(400).json({
        message:
          "This email address already exists, please try with different email address.",
      });
    }

    if (!validateLenght(first_name, 3, 30)) {
      return res.status(400).json({
        message: "firstname must between 3 and 30 characters.",
      });
    }
    if (!validateLenght(last_name, 3, 30)) {
      return res.status(400).json({
        message: "lastname must between 3 and 30 characters.",
      });
    }
    if (!validateLenght(password, 6, 40)) {
      return res.status(400).json({
        message: "password must be atleast 6 characters.",
      });
    }

    const cryptedPasswords = await bcrypt.hash(password, 12);
    console.log(cryptedPasswords);

    let tempUsername = first_name + last_name;
    let newUsername = await validateUsername(tempUsername);
    const user = await new User({
      first_name,
      last_name,
      email,
      password: cryptedPasswords,
      username: newUsername,
    }).save();

    const token = generateToken({ id: user._id.toString() }, "7d");

    res.send({
      id: user._id,
      username: user.username,
      picture: user.picture,
      first_name: user.first_name,
      last_name: user.last_name,
      token: token,
      verified: user.verified,
      message: "Register success, please activate your email to start!",
    });

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message:
          "the email address your entered was not connected to an account",
      });
    }

    const check = await bcrypt.compare(password, user.password);
    if (!check) {
      return res.status(400).json({
        message: "invalid credentials, please try again",
      });
    }

    const token = generateToken({ id: user._id.toString() }, "7d");
    res.send({
      id: user._id,
      username: user.username,
      first_name: user.first_name,
      last_name: user.last_name,
      token: token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
