import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "./AuthProvider";
import { useEffect } from "react";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathName = usePathname();

  useEffect(() => {
    if (loading) {
      return;
    }
    if (pathName === "/dashboard" && !user) {
      router.push("/");
    }
  }, [pathName, router, user,loading]);

  return <>{children}</>;
}
