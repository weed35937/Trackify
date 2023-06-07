import axios from "axios";

const API = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_URL}/api/`
});

export const AdminRegister = async (data) =>
  await API.post("/auth/admin/register", data);

export const AdminLogin = async (data) =>
  await API.post("/auth/admin/login", data);

export const EmployeeLogin = async (data) =>
  await API.post("/auth/employee/login", data);

export const generateOtp = async (email, name, reason) =>
  await API.get(
    `/auth/admin/generateotp?email=${email}&name=${name}&reason=${reason}`
  );
export const verifyOtp = async (otp) =>
  await API.get(`/auth/admin/verifyotp?code=${otp}`);

export const resetPassword = async (email, password) =>
  await API.put("/auth/admin/forgetpassword", { email, password });

export const employeeRegister = async (data, token) =>
  await API.post(
    "/admin/employeeregister",
    data,
    { headers: { Authorization: `Bearer ${token}` } },
    { withCredentials: true }
  );

export const findUserByEmail = async (email) =>
  await API.get(`/auth/admin/findbyemail?email=${email}`);
