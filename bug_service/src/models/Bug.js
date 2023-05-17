const mongoose = require("mongoose");
const { search } = require("../../../src/routes/auth");

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
      required: true,
      enum: ["low", "medium", "high"],
      message: `{Value} is not Valid!`,
    },
    deadline: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
      defaultValue: "pending",
      message: `{Value} is not Valid!`,
      enum: ["pending", "in-progress", "completed"],
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
