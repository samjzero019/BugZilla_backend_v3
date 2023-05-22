const User = require("../models/User");

exports.getUsers = async (req, res, next) => {
  const id = req.params?.id;
  try {
    var users;
    if (id) {
      users = await User.findById(id);
    } else {
      users = await User.find();
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Something Went Wrong!`, error: error.message });
  }
  if (!users) {
    return res.status(400).json({
      message: `Something Went Wrong!`,
      error: ` No Valid Record Found!`,
    });
  }

  res
    .status(200)
    .json({ message: "Users retrieval successful!", response: users });
};

exports.changeRole = async (req, res, next) => {
  const { id } = req.params;
  const { role } = req.body;
  try {
    var result = await User.updateOne(
      { _id: id },
      { role },
      { runValidators: true }
    );
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Something Went Wrong!`, error: error.message });
  }
  if (result.modifiedCount <= 0) {
    return res
      .status(500)
      .json({
        message: `Make Sure to Check for Valid ID and Permissable Roles`,
        error: `Invalid Record/Input!`,
      });
  }
  res.status(200).json({ message: "User Role Changed Successfully!" });
};
