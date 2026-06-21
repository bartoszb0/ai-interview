"use client";

import { useAuthStore } from "@/store/auth-store";
import { useEffect } from "react";

export default function AuthInitializer() {
  const checkAuth = useAuthStore((s) => s.checkAuth);

  useEffect(() => {
    localStorage.removeItem("auth-store");
    checkAuth();
  }, [checkAuth]);

  return null;
}
