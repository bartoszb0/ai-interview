import { LoginFormData } from "@/schemas/auth/loginSchema";
import { RegisterFormData } from "@/schemas/auth/registerSchema";
import { apiClient } from "./client";

export function registerCall(data: RegisterFormData) {
  return apiClient("/auth/register", {
    method: "POST",
    body: JSON.stringify({
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword,
    }),
  });
}

export function loginCall(data: LoginFormData) {
  return apiClient("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email: data.email, password: data.password }),
  });
}

export function logoutCall() {
  return apiClient("/auth/logout", { method: "POST" });
}

export function getMeCall() {
  return apiClient("/auth/me");
}
