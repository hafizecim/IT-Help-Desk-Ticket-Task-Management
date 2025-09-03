import { useState } from "react";
import { useLocation, NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Ticket,
  FolderOpen,
  Users,
  BarChart3,
  Settings,
  Clock,
  AlertCircle,
  CheckCircle,
  Play,
  Pause,
  Square,
  User
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
  useSidebar,
} from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";

const mainNavItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Tickets", url: "/tickets", icon: Ticket, badge: "12" },
  { title: "Projects", url: "/projects", icon: FolderOpen },
  { title: "Work Timer", url: "/timer", icon: Clock },
];

const managementItems = [
  { title: "Users", url: "/users", icon: Users },
  { title: "Reports", url: "/reports", icon: BarChart3 },
  { title: "Settings", url: "/settings", icon: Settings },
];

const quickActions = [
  { title: "Continue Work", icon: Play, color: "success" },
  { title: "Pause Work", icon: Pause, color: "warning" },
  { title: "Complete Work", icon: Square, color: "primary" },
];

export function ITSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path;
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive 
      ? "bg-primary/20 text-primary border-r-2 border-primary font-medium" 
      : "hover:bg-muted/50 text-muted-foreground hover:text-foreground";

  return (
    <Sidebar
      className={`${collapsed ? "w-15.9" : "w-72.1"} border-r border-border bg-card shadow-card transition-all duration-300 flex-shrink-0`}
    >
      <SidebarContent className="p-4">
        {/* Logo/Header */}
        <div className="mb-6 px-2">
          {!collapsed ? (
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-primary flex items-center justify-center">
                <AlertCircle className="h-4 w-4 text-white" />
              </div>
              <span className="font-bold text-lg bg-gradient-primary bg-clip-text text-transparent">
                IT HelpDesk
              </span>
            </div>
          ) : (
            <div className="h-8 w-8 rounded-lg bg-gradient-primary flex items-center justify-center mx-auto">
              <AlertCircle className="h-4 w-4 text-white" />
            </div>
          )}
        </div>

        {/* Current User */}
        {!collapsed && (
          <div className="mb-6 p-3 bg-muted/30 rounded-lg border border-border">
            <div className="flex items-center space-x-3">
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                <User className="h-4 w-4 text-primary-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground">Hafize Şenyıl</p>
                <p className="text-xs text-muted-foreground">IT Administrator</p>
              </div>
              <div className="h-2 w-2 bg-success rounded-full"></div>
            </div>
          </div>
        )}

        {/* Main Navigation */}
        <SidebarGroup>
          {!collapsed && <SidebarGroupLabel>Navigation</SidebarGroupLabel>}
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNavItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="mb-1">
                    <NavLink 
                      to={item.url} 
                      end 
                      className={getNavCls}
                    >
                      <item.icon className={`${collapsed ? "h-5 w-5" : "h-4 w-4 mr-3"}`} />
                      {!collapsed && (
                        <div className="flex items-center justify-between flex-1">
                          <span>{item.title}</span>
                          {item.badge && (
                            <Badge variant="secondary" className="text-xs px-2 py-0.5">
                              {item.badge}
                            </Badge>
                          )}
                        </div>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Quick Actions */}
        {!collapsed && (
          <SidebarGroup>
            <SidebarGroupLabel>Quick Actions</SidebarGroupLabel>
            <SidebarGroupContent>
              <div className="space-y-2">
                {quickActions.map((action, index) => (
                  <button
                    key={index}
                    className={`w-full flex items-center space-x-3 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors ${
                      action.color === 'success' ? 'border-success/30 hover:bg-success/5' :
                      action.color === 'warning' ? 'border-warning/30 hover:bg-warning/5' :
                      'border-primary/30 hover:bg-primary/5'
                    }`}
                  >
                    <action.icon className={`h-4 w-4 ${
                      action.color === 'success' ? 'text-success' :
                      action.color === 'warning' ? 'text-warning' :
                      'text-primary'
                    }`} />
                    <span className="text-sm font-medium">{action.title}</span>
                  </button>
                ))}
              </div>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        {/* Management */}
        <SidebarGroup>
          {!collapsed && <SidebarGroupLabel>Management</SidebarGroupLabel>}
          <SidebarGroupContent>
            <SidebarMenu>
              {managementItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="mb-1">
                    <NavLink 
                      to={item.url} 
                      className={getNavCls}
                    >
                      <item.icon className={`${collapsed ? "h-5 w-5" : "h-4 w-4 mr-3"}`} />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}