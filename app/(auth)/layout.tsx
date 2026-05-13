import { Card } from "@/components/ui/card";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <div className="flex w-full max-w-sm justify-center">
        <Card className="w-full p-6">{children}</Card>
      </div>
    </div>
  );
}
