const mongoose = require("mongoose");
const { type } = require("os");
const { boolean } = require("webidl-conversions");
const { Schema } = mongoose;

const todoSchema = new Schema(
  {
    title: {
      type: String,
      required: ["Title is required", true],
    },
    desc: {
      type: String,
      required: ["Description is required", true],
    },
    image: {
      type: String,
      required: ["Image is required", true],
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: ["User ID is required", true],
    },
    // dueDate: {
    //   type: Date,
    //   required: ["Duration Date is required", true],
    // },
    priority: {
      type: String,
      enum: ["low", "meduim", "high"],
      required: ["Priority is required", true],
    },
  },
  { timestamps: true }
);

const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;
