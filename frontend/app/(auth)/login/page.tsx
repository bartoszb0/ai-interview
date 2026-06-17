"use client";

import { Button } from "@/components/ui/button";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginCall } from "@/lib/api/auth";
import { loginSchema, type LoginFormData } from "@/schemas/auth/loginSchema";
import { useAuthStore } from "@/store/auth-store";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function Login() {
  const router = useRouter();
  const login = useAuthStore((s) => s.login);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({ resolver: zodResolver(loginSchema) });

  async function onSubmit(data: LoginFormData) {
    try {
      const res = await loginCall(data);
      login(res.access_token, res.email);
      router.push("/");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Login failed");
    }
  }

  return (
    <>
      <CardHeader>
        <CardTitle className="text-2xl">Sign in</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email.message}</p>
            )}
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              {...register("password")}
            />
            {errors.password && (
              <p className="text-sm text-destructive">
                {errors.password.message}
              </p>
            )}
          </div>
          <Button className="w-full mt-2" disabled={isSubmitting}>
            {isSubmitting ? "Signing in…" : "Sign in"}
          </Button>
        </form>
        <p className="text-center text-sm text-muted-foreground mt-2">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-primary hover:underline">
            Register
          </Link>
        </p>
      </CardContent>
    </>
  );
}
