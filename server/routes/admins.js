/* eslint-disable import/extensions */
import express from "express";
import {
  EmployeeRegister,
  getAllEmployee,
  getEmployee
} from "../controllers/admin.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/employeeregister", verifyToken, EmployeeRegister);
router.get("/getAllEmployees", verifyToken, getAllEmployee);
router.get("/getEmployee/:employeeId", verifyToken, getEmployee);

export default router;
