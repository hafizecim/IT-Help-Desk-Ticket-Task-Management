import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ITSidebar } from "./ITSidebar";
import { Bell, Search, Settings, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface ITLayoutProps {
  children: React.ReactNode;
}

export function ITLayout({ children }: ITLayoutProps) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <ITSidebar />
        
        <div className="flex flex-col flex-1">
          {/* Header */}
          <header className="h-16 border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
            <div className="flex items-center justify-between h-full px-6">
              <div className="flex items-center space-x-4">
                <SidebarTrigger className="h-8 w-8" />
                
                {/* Search */}
                <div className="relative w-96">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search tickets, projects, users..." 
                    className="pl-10 bg-muted/30 border-border focus:bg-background"
                  />
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                {/* Notifications */}
                <Button variant="ghost" size="sm" className="relative">
                  <Bell className="h-4 w-4" />
                  <Badge 
                    variant="destructive" 
                    className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                  >
                    3
                  </Badge>
                </Button>
                
                {/* Settings */}
                <Button variant="ghost" size="sm">
                  <Settings className="h-4 w-4" />
                </Button>
                
                {/* User Menu */}
                <Button variant="ghost" size="sm" className="space-x-2">
                  <div className="h-6 w-6 rounded-full bg-gradient-primary flex items-center justify-center">
                    <User className="h-3 w-3 text-white" />
                  </div>
                  <span className="text-sm font-medium">John Doe</span>
                </Button>
              </div>
            </div>
          </header>
          
          {/* Main Content */}
          <main className="flex-1 p-6 bg-background min-w-0">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}