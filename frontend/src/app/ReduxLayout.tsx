"use client";
import AuthGuard from "@/lib/firebase/AuthGuard";
import { AuthProvider } from "@/lib/firebase/AuthProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export default function ReduxLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <AuthProvider>
      <AuthGuard>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </AuthGuard>
    </AuthProvider>
  );
}
