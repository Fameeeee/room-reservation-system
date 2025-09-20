import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import React from "react";
import {
  LayoutDashboard,
  Hotel,
  Bed,
  CircleStar,
  Users,
  Settings,
  LogOut,
} from "lucide-react";
import { Button } from "../ui/button";

const menuItems = [
  { label: "Dashboard", href: "/controller", icon: <LayoutDashboard /> },
  { label: "Hotels", href: "/controller/hotels", icon: <Hotel /> },
  { label: "Rooms", href: "/controller/rooms", icon: <Bed /> },
  { label: "Bookings", href: "/controller/bookings", icon: <CircleStar /> },
  { label: "Users", href: "/controller/users", icon: <Users /> },
  { label: "Settings", href: "/controller/settings", icon: <Settings /> },
];

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Admin Panel</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton asChild>
                    <a href={item.href} className="flex items-center gap-2">
                      {item.icon}
                      <span>{item.label}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenuButton asChild>
          <Button>
            <LogOut />
            <span>Logout</span>
          </Button>
        </SidebarMenuButton>
      </SidebarFooter>
    </Sidebar>
  );
}
