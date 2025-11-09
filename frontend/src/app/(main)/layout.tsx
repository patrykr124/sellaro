import Navbar from "@/components/ui/navbar/Navbar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sellaro",
  description: "Smart AI chatbot",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar className="top-2" />
      <main>{children}</main>
    </>
  );
}
