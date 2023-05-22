const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  text: {
    type: String,
    trim: true,
    unique: true,
    lowercase: true,
    required: true,
  },
  _creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  _attached_to: {
    type: Schema.Types.ObjectId, 
    ref: "Bug",
  },
});

module.exports = mongoose.model("Comment", commentSchema);
