const mongoose = require("mongoose");

const PostSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
      default: [],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    views: {
      type: Number,
      default: 0,
    },
    likes: { type: Number, default: 0 },
    postImage: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("posts", PostSchema);
