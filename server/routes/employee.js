/* eslint-disable import/extensions */
import express from "express";
import { createNewTask } from "../controllers/employee.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/createtask", verifyToken, createNewTask);

export default router;
