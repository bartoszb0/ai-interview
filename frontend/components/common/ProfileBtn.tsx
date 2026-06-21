"use client";

import ThemeToggle from "@/components/common/theme-toggle";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuthStore } from "@/store/auth-store";
import { User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ProfileBtn() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isLoading = useAuthStore((state) => state.isLoading);
  const logout = useAuthStore((state) => state.logout);
  const pathname = usePathname();
  const onSessions = pathname.startsWith("/sessions");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="lg">
          <User />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="rounded-none cursor-pointer">
        {!isLoading && (
          <>
            {isAuthenticated ? (
              <DropdownMenuGroup>
                <DropdownMenuItem asChild>
                  {onSessions ? (
                    <Link href="/">Home</Link>
                  ) : (
                    <Link href="/sessions">My sessions</Link>
                  )}
                </DropdownMenuItem>
                <DropdownMenuItem className="text-red-400" onClick={logout}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuGroup>
            ) : (
              <DropdownMenuGroup>
                <DropdownMenuItem asChild>
                  <Link href={"/login"}>Login</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href={"/register"}>Register</Link>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            )}
            <DropdownMenuSeparator />
          </>
        )}
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <ThemeToggle />
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
