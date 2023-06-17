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

export const findUserByEmail = async (email) =>
  await API.get(`/auth/admin/findbyemail?email=${email}`);

export const updatePassword = async (data, token) =>
  await API.put("/auth/updatepassword", data, {
    headers: { Authorization: `Bearer ${token}` }
  });

export const updateProfile = async (data, token) =>
  await API.put("/auth/updateprofile", data, {
    headers: { Authorization: `Bearer ${token}` }
  });

// Admin Routes

export const employeeRegister = async (data, token) =>
  await API.post(
    "/admin/employeeregister",
    data,
    { headers: { Authorization: `Bearer ${token}` } },
    { withCredentials: true }
  );

export const getAllEmployees = async (token) =>
  await API.get("/admin/getAllEmployees", {
    headers: { Authorization: `Bearer ${token}` }
  });

export const getEmployee = async (employeeId, token) =>
  await API.get(`/admin/getEmployee/${employeeId}`, {
    headers: { Authorization: `Bearer ${token}` }
  });

// Employee Routes
export const createNewTask = async (data, token) =>
  await API.post("/employee/createtask", data, {
    headers: { Authorization: `Bearer ${token}` }
  });

export const updateTask = async (data, token) =>
  await API.put("/employee/updatetask", data, {
    headers: { Authorization: `Bearer ${token}` }
  });

export const deleteTask = async (id, token) =>
  await API.delete(`/employee/deletetask?taskId=${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });

export const getAllTasks = async (token) =>
  await API.get("/employee/getalltasks", {
    headers: { Authorization: `Bearer ${token}` }
  });
