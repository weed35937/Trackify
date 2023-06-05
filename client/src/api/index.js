import React from "react";
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
