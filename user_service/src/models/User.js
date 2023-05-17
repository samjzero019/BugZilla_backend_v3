const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const UserSchemaDefinition = new Schema(
  {
    // id is auto
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: [4, "Must be atleast 4 character", "Found {VALUE}"],
    },
    role: {
      type: String,
      enum: ["developer", "qa", "manager"],
      required: true,
      lowercase: true,
      trim: true,
      message: `{Value} is not Valid`,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("User", UserSchemaDefinition);
