import dotenv from "dotenv";
import bcrypt from "bcrypt";
// eslint-disable-next-line import/extensions
import User from "../models/User.js";
// eslint-disable-next-line import/extensions
import { createError } from "../error.js";

dotenv.config();

// eslint-disable-next-line import/prefer-default-export, consistent-return
export const EmployeeRegister = async (req, res, next) => {
  try {
    const {
      email,
      password,
      username,
      // eslint-disable-next-line camelcase
      contact_number,
      department,
      // eslint-disable-next-line camelcase
      joining_date
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
      // eslint-disable-next-line camelcase
      contact_number,
      department,
      // eslint-disable-next-line camelcase
      joining_date
    });

    const createdUser = await user.save();

    admin.employees.push(createdUser._id);
    await admin.save();

    res.status(200).json({ employee: createdUser });
  } catch (error) {
    return next(error);
  }
};

export const getAllEmployee = async (req, res, next) => {
  try {
    const { id } = req.user;

    // check if user exists and is a employee
    const user = await User.findById(id).populate({
      path: "employees",
      select: "-password"
    });
    if (!user) {
      return next(createError(404, "User not found"));
    }

    if (user.role !== "admin") {
      return next(createError(401, "You are not authorized to view this page"));
    }

    return res.status(200).json({
      message: "Employees fetched successfully",
      employees: user.employees
    });
  } catch (err) {
    return next(createError(err.statusCode, err.message));
  }
};

export const getEmployee = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { employeeId } = req.params;

    // check if user exists and is a admin
    const user = await User.findById(id);

    if (!user) {
      return next(createError(404, "User not found"));
    }

    if (user.role !== "admin") {
      return next(createError(401, "You are not authorized to view this page"));
    }

    // Fetch the employee with the given id
    const employee = await User.findById(employeeId)
      .select("-password")
      .populate("tasks")
      .exec();

    if (!employee) {
      return next(createError(404, "Employee not found"));
    }

    return res.status(200).json({
      message: "Employee fetched successfully",
      employee
    });
  } catch (err) {
    return next(createError(err.statusCode, err.message));
  }
};
