import jwt from "jsonwebtoken";
import { createError } from "../error.js";

// eslint-disable-next-line import/prefer-default-export
export const verifyToken = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return next(createError(401, "You are not authenticated!"));
    }

    // Get the token from the header
    const token = req.headers.authorization.split(" ")[1];

    // Check if token exists
    if (!token) return next(createError(401, "You are not authenticated!"));

    const decode = jwt.verify(token, process.env.JWT);
    req.user = decode;
    return next();
  } catch (error) {
    return next(createError(402, error.message));
  }
};
