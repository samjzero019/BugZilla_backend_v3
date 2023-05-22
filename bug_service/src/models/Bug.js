const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const bugSchemaDefinition = new Schema(
  {
    // id is auto
    title: {
      type: String,
      trim: true,
      unique: true,
      lowercase: true,
      required: true,
    },
    description: String,
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "low",
      required: true,
      message: `{Value} is not Valid!`,
    },
    deadline: {
      type: Number,
      required: true,
    },
    status: {
      type: String, // [Low, Medium, High]
      enum: ["pending", "in-progress", "completed"],
      default: "pending",
      required: true,
      message: "{Value} is not valid",
    },
    assigned_to: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    _creator: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Bug", bugSchemaDefinition);
