"use client";
import { useEffect, useState, createContext, useContext } from "react";
import { auth, provider } from "./firebase";
import { onAuthStateChanged, signInWithPopup, type User } from "firebase/auth";
import { useRouter } from "next/navigation";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const signIn = async () => {
    await signInWithPopup(auth, provider);
    router.push("/dashboard");
  };
  const signOut = () => auth.signOut();

  useEffect(() => {
    const handleUser = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => {
      handleUser();
    };
  }, []);

  const value = { user, loading, signIn, signOut };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("problem z useAuth provider!!!");
  }
  return context;
}
