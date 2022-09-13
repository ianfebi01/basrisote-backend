const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema;

const postSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["product", "testimoni", null],
      default: null,
    },
    category: {
      type: String,
    },
    header: {
      type: String,
    },
    body: {
      type: String,
    },
    images: {
      type: String,
    },
    user: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Post", postSchema);
