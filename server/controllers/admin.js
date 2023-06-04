import User from "../models/User.js";
import { createError } from "../error.js";
import dotenv from "dotenv";
import bcrypt from "bcrypt";

dotenv.config();

export const EmployeeRegister = async (req, res, next) => {
  try {
    const {
      email,
      password,
      username,
      contact_number,
      department,
      joining_date,
    } = req.body;

    const { id } = req.user;

    // Check we have an email
    if (!email) {
      return next(createError(422, "Missing email."));
    }

    // Check if the email is in use
    const existingUser = await User.findOne({ email }).exec();
    if (existingUser) {
      return next(createError(409, "Email is already in use."));
    }

    const admin = await User.findById(id).exec();

    if (!admin) {
      return next(createError(404, "Admin not found"));
    }

    if (admin.role !== "admin") {
      return next(createError(403, "You are not an admin"));
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const user = new User({
      username,
      email,
      password: hashedPassword,
      role: "employee",
      contact_number,
      department,
      joining_date,
    });

    const createdUser = await user.save();

    await admin.employees.push(createdUser._id);
    await admin.save();

    res.status(200).json({ employee: createdUser });
  } catch (error) {
    return next(error);
  }
};
