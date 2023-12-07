import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["personal", "work", "shopping", "other"],
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["todo", "in-progress", "done"],
    default: "todo",
  },
});

export default mongoose.model("Task", taskSchema);
