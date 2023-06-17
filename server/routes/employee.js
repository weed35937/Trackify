/* eslint-disable import/extensions */
import express from "express";
import {
  createNewTask,
  deleteTask,
  getAllTasks,
  updateTask
} from "../controllers/employee.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/createtask", verifyToken, createNewTask);
router.get("/getalltasks", verifyToken, getAllTasks);
router.put("/updatetask", verifyToken, updateTask);
router.delete("/deletetask", verifyToken, deleteTask);

export default router;
