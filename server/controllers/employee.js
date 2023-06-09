/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import dotenv from "dotenv";
import User from "../models/User.js";
import Task from "../models/Tasks.js";
import { createError } from "../error.js";

dotenv.config();

// eslint-disable-next-line consistent-return
export const createNewTask = async (req, res, next) => {
  try {
    // check if user exists
    const user = await User.findById(req.user.id);
    if (!user) {
      return next(createError(404, "User not found"));
    }
    const newTask = new Task(req.body);
    const savedTask = await newTask.save();
    // add the task id to the user's tasks array
    user.tasks.push(savedTask._id);
    const savedUser = await user.save();
    return res.status(200).json({
      message: "Task created successfully",
      user: savedUser
    });
  } catch (err) {
    return next(createError(err.statusCode, err.message));
  }
};

export const getTasks = async (req, res) => {
  res.status(200).json({ message: "getTasks" });
};
