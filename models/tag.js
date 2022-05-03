const mongoose = require("mongoose");

const tagSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      max: 32,
      unique: true,
      trim: true,
    },
    slug: {
      type: String,
      max: 32,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Tag", tagSchema);
