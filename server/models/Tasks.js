import mongoose from "mongoose";

const TasksSchema = new mongoose.Schema(
  {
    task_description: { type: String, required: true },
    task_type: { type: String, required: true, default: "work" },
    start_time: { type: Date, required: true, default: Date.now() },
    time_taken: { type: Number, required: true, default: 0 }
  },
  { timestamps: true }
);

export default mongoose.model("Tasks", TasksSchema);
