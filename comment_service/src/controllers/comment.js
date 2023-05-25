const Comment = require("../models/Comment");
const fetchBugRecord = require("../utils/helper");
exports.createComment = async (req, res, next) => {
  const { text, bugID } = req.body;
  const token = req.get("Authorization") || req.get("authorization");
  const bug = await fetchBugRecord(bugID, token);
  // console.log("bugRecord", bug);
  if (bug === false) {
    return res
      .status(400)
      .json({ message: `Failed to Find Valid Record with bugID: ${bugID}` });
  }
  try {
    var comment = await Comment.create({
      text,
      _attached_to: bugID,
      _creator: req.current_user._id,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Something Went Wrong!`, error: error.message });
  }
  if (!comment) {
    return res.status(400).json({ message: `Something Went Wrong!` });
  }
  res
    .status(200)
    .json({ message: "Comment Created Successfully!", response: comment });
};

exports.getComments = async (req, res, next) => {
  const id = req.params?.id;
  let comments;
  try {
    if (id) {
      comments = await Comment.findOne({ _id: id });
    } else {
      comments = await Comment.find();
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Something Went Wrong!`, error: error.message });
  }
  if (!comments) {
    return res.status(500).json({
      message: `Something Went Wrong!`,
      error: `Invalid Record/s Found!`,
    });
  }

  res
    .status(200)
    .json({ message: "Comment Retrieved Successfully!", response: comments });
};

exports.updateComment = async (req, res, next) => {
  const body = req.body;
  const { id } = req.params;
  if (body._creator) {
    return res.status(400).json({
      message: `Something Went Wrong!`,
      error: `You Cant update Comment Creator! `,
    });
  }
  //todo: if there is change in bugID ... need to first confirm BugID !
  try {
    var result = await Comment.updateOne({ _id: id }, body, {
      runValidators: true,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Something Went Wrong!`, error: error.message });
  }
  if (result.modifiedCount <= 0) {
    return res.status(400).json({ message: `Failed to Find Valid Record!!` });
  }

  res.status(200).json({ message: "Comment Updated Successfully!" });
};

exports.deleteComment = async (req, res, next) => {
  const { id } = req.params;
  try {
    var result = await Comment.deleteOne({ _id: id });
  } catch (err) {
    return res
      .status(500)
      .json({ message: `Something Went Wrong!`, error: err.message });
  }
  //todo: see why delete is giving +ve response on invalid ID record!
  console.log("result in comment: ", result);
  if (!result.deletedCount<=0) {
    return res.status(400).json({ message: `Failed to Find Valid Record!` });
  }

  res.status(200).json({ message: "Comment Deleted Successfully!" });
};
