const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    dueDate: {
      type: Date,
    },
    status: {
      type: String,
      enum: ["Open", "Completed"],
      default: "Open",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Todo", todoSchema);