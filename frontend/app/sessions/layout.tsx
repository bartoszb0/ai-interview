import AuthGuard from "@/components/common/AuthGuard";

export default function SessionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthGuard>{children}</AuthGuard>;
}
