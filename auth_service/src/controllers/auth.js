const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const User = require("../models/User");

exports.register = async (req, res, next) => {
  const { email, password, role } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 12);
  try {
    const duplicateUser = await User.findOne({ email });
    if (duplicateUser) {
      return res
        .status(400)
        .json({ message: `User with ${email} already exists` });
    } else {
      try {
        const newUser = await User.create({
          email,
          password: hashedPassword,
          role,
        });
        console.log("newUSer", newUser);
        res.status(200).json({
          message: "User Registration Successful",
          response: newUser,
        });
      } catch (error) {
        console.log("Failed to create User", error.message);
        return res
          .status(400)
          .json({ message: `Something Went Wrong`, error: error.message });
      }
    }
  } catch (error) {
    return res
      .status(400)
      .json({ message: `Something Went Wrong`, error: error.message });
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  let user;
  try {
    user = await User.findOne({ email });
  } catch (error) {
    return res.status(400).json({
      message: `Failed To Login User! Something went Wrong!`,
      error: error.message,
    });
  }
  if (!user) {
    return res.status(401).json({ message: `Invalid Email ` });
  }

  if (!bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ message: `Invalid Password` });
  }
  //JWT Signed token
  const token = JWT.sign(
    {
      user: { _id: user._id, email: user.email, role: user.role }, // removed pass and extra fields
    },
    process.env.JWT_SECRET,
    { expiresIn: "2h" }
  );

  const refreshToken = JWT.sign(
    {
      user: { _id: user._id, email: user.email, role: user.role }, // removed pass and extra fields
    },
    process.env.JWT_SECRET,
    { expiresIn: "12h" }
  );

  res
    .status(200)
    .json({ message: "User Logged In Successfully!", token, refreshToken });
};

exports.logout = (req, res, next) => {
  // res.clearCookie("x-auth-token");
  req.current_user = {};
  res.status(200).json({ message: "User logout successful" });
};
