import express from "express";
import { EmployeeRegister } from "../controllers/admin.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/employeeregister", verifyToken, EmployeeRegister);


export default router;
