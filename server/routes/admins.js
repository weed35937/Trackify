/* eslint-disable import/extensions */
import express from "express";
import { EmployeeRegister, getAllEmployee } from "../controllers/admin.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/employeeregister", verifyToken, EmployeeRegister);
router.get("/getAllEmployees", verifyToken, getAllEmployee);

export default router;
