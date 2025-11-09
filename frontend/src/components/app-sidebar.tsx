"use client";
import {
  ArrowBigDown,
  Bot,
  ChevronDown,
  Home,
  Inbox,
  Search,
  Settings,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import Logo from "./ui/Logo";
import Link from "next/link";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@radix-ui/react-collapsible";
import { usePathname } from "next/navigation";

// Menu items.
const items = [
  {
    title: "Home",
    url: "#",
    icon: Home,
  },
  {
    title: "Inbox",
    url: "#",
    icon: Inbox,
  },
  {
    title: "Agent AI",

    icon: Bot,
    sub: [
      {
        id: 1,
        title: "Customize",
        url: "/dashboard/agent-ai/customize",
      },
      {
        id: 2,
        title: "Tuning",
        url: "/dashboard/agent-ai/tunning",
      },
      {
        id: 3,
        title: "Setting",
        url: "/dashboard/agent-ai/setting",
      },
    ],
  },
  {
    title: "Search",
    url: "#",
    icon: Search,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
];

export function AppSidebar() {
  const pathName = usePathname();

  function handleOpen(item: any) {
    if (!item.sub) return false;
    return item.sub.some((subItem: any) => pathName === subItem.url);
  }

  return (
    <Sidebar collapsible="icon" className="">
      <SidebarContent className="bg-background-gray-2">
        <SidebarGroup className="text-white">
          <SidebarGroupLabel className="text-white mb-4 border-b-[0.1px] border-black/15">
            <Logo />
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <Collapsible
                  defaultOpen={handleOpen(item)}
                  key={item.title}
                  className="group/collapsible"
                >
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton asChild>
                        {item.url ? (
                          <Link
                            href={item.url}
                            className="flex justify-between"
                          >
                            <span className="flex items-center gap-2">
                              <item.icon size={16} />
                              <span className="truncate">{item.title}</span>
                            </span>
                            <div className="">
                              <ChevronDown size={16} />
                            </div>
                          </Link>
                        ) : (
                          <div className="flex items-center gap-2 justify-between w-full">
                            <span className="flex items-center gap-2">
                              <item.icon size={18} />
                              <span className="truncate">{item.title}</span>
                            </span>
                            <ChevronDown size={16} />
                          </div>
                        )}
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    {item.sub &&
                      item.sub.map((e) => (
                        <CollapsibleContent key={e.id}>
                          <Link href={e.url}>
                            <SidebarMenuSub>
                              <SidebarMenuSubItem active={pathName === e.url}>
                                {e.title}
                              </SidebarMenuSubItem>
                            </SidebarMenuSub>
                          </Link>
                        </CollapsibleContent>
                      ))}
                  </SidebarMenuItem>
                </Collapsible>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
