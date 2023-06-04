import express from "express";
import {
  AdminRegister,
  AdminLogin,
  EmployeeLogin,
  generateOTP,
  verifyOTP,
  createResetSession,
  resetPassword,
} from "../controllers/auth.js";
import { localVariables } from "../middleware/verifyEmail.js";

const router = express.Router();

router.post("/admin/register", localVariables, AdminRegister);
router.post("/admin/login", AdminLogin);
router.get("/admin/generateotp", localVariables, generateOTP);
router.get("/admin/verifyotp", verifyOTP);
router.get("/admin/createResetSession", createResetSession);
router.put("/admin/forgetpassword", resetPassword);
router.post("/employee/login", EmployeeLogin);

export default router;
