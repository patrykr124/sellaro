import { AppSidebar } from "@/components/app-sidebar";
import Chatbot_layout from "@/components/ui/chatbot/Chatbot_layout";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider className="">
      <AppSidebar />
      <main className="flex flex-col w-full">
        <SidebarTrigger />
        {children}
        <Chatbot_layout />
      </main>
      
    </SidebarProvider>
  );
}
