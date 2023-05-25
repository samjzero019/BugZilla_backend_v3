const Bug = require("../models/Bug");
const fetchBugRecord = require("../utils/helper");

exports.createBug = async (req, res, next) => {
  // const { title, description, deadline, priority, status } = req.body;
  const body = req.body;

  try {
    var existingBug = await Bug.findOne({ title: body.title });
  } catch (error) {
    console.log("Error During Bug Creation", error.message);
    return res
      .status(500)
      .json({ message: "Something Went Wrong!", error: error.message });
  }
  if (existingBug) {
    return res.status(500).json({ message: "Title should be unique!" });
  }

  try {
    body["_creator"] = req.current_user._id;
    var bug = await Bug.create(body);
  } catch (err) {
    console.log("Error During Bug Creation", err.message);
    return res
      .status(500)
      .json({ message: "Bug Creation Failed", error: err.message });
  }

  res.status(200).json({ message: "Bug Created Successfully!", response: bug });
};

exports.retrieveBugs = async (req, res, next) => {
  const id = req.params?.id;
  try {
    var bugs;
    if (id) {
      // console.log("ID in bugGET: ", id);
      bugs = await Bug.find({ _id: id });
    } else {
      bugs = await Bug.find();
    }
  } catch (error) {
    console.log("Failed to get Bug Records!", error.message);
    return res.status(400).json({
      message: "Failed to retrieve Bug Records",
      error: error.message,
    });
  }
  if (!bugs) {
    return res.status(400).json({
      message: "Failed to retrieve Bug Records",
      error: "No Valid Record Found!",
    });
  }

  res
    .status(200)
    .json({ message: "Bugs Retrieved Successfully!", response: bugs });
};

exports.updateBug = async (req, res, next) => {
  const body = req.body;
  const { id } = req.params;
  try {
    var updatedBug = await Bug.updateOne({ _id: id }, body);
    console.log("updatedBugResponse!", updatedBug);
  } catch (error) {
    console.log("Failed to update The Record!", error.message);
    return res
      .status(500)
      .json({ message: "Failed to update the record!", error: error.message });
  }
  if (updatedBug.modifiedCount <= 0) {
    return res
      .status(400)
      .json({ message: "Failed to Find Valid Record/ No Change Found!" });
  }

  res
    .status(200)
    .json({ message: "Bug updated Successfully!", response: updatedBug });
};

exports.deleteBug = async (req, res, next) => {
  const { id } = req.params;
  try {
    var result = await Bug.deleteOne({ _id: id });
  } catch (err) {
    console.log(`Failed to delete Bug Record with id: ${id}`, err.message);
    return res.status(500).json({
      message: `Failed to delete Bug Record with id: ${id}`,
      error: err.message,
    });
  }
  if (!result) {
    res.status(400).json({
      message: `Something went Wrong!`,
      error: `Failed to Find/delete Record with id: ${id}`,
    });
  }

  res.status(200).json({ message: "Bug Record Deleted Successfully!" });
};

exports.assignToUser = async (req, res, next) => {
  const { id } = req.params;
  const { userID } = req.body;

  const token = req.get("Authorization") || req.get("authorization");
  const isUser = await fetchBugRecord(userID, token);
  console.log("userRecord", isUser);
  if (isUser === false) {
    return res
      .status(400)
      .json({ message: `Failed to Find Valid Record with userID: ${userID}` });
  }

  let existingBug;
  try {
    existingBug = await Bug.findOne({ _id: id });
  } catch (err) {
    return res
      .status(500)
      .json({ message: `Something Went Wrong!`, error: err.message });
  }
  if (!existingBug) {
    return res
      .status(400)
      .json({ message: `Failed to Find Valid Bug Record against id: ${id}` });
  }
  // now check if given user id is also valid
  // let isUser;
  // try {
  //   isUser = await ////TODO: now this is main purpose .. communicate with user service and validate this user ID
  // } catch (err) {
  //   return res
  //     .status(500)
  //     .json({ message: `Something went Wrong!`, error: err.message });
  // }
  //!info after userID is validated then just go and assign bug to user foe further process
  try {
    var result = await Bug.updateOne(
      { _id: id },
      { _creator: userID },
      { runValidators: true }
    ); //?question: will this validation Id as UserRef...
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Failed to update Bug Record!`, error: error.message });
  }
  if (result.modifiedCount <= 0) {
    return res.status(400).json({ message: `Failed to Find Valid Record!` });
  }

  res.status(200).json({
    message: `Bug with id:${id} Assigned To User with id: ${userID} Successfully!`,
  });
};

// //TODO: see if there is any need to make BugStatusUpdate route separately
