/* eslint-disable import/extensions */
import express from "express";
import { createNewTask, getAllTasks } from "../controllers/employee.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/createtask", verifyToken, createNewTask);
router.get("/getalltasks", verifyToken, getAllTasks);

export default router;
