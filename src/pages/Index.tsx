import { ITLayout } from "@/components/layout/ITLayout";
import { DashboardStats } from "@/components/dashboard/DashboardStats";
import { TicketList } from "@/components/tickets/TicketList";
import { WorkTimer } from "@/components/dashboard/WorkTimer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Filter, Download } from "lucide-react";

const Index = () => {
  return (
    <ITLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              IT Help Desk Dashboard
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage tickets, projects, and team performance
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <Button size="sm" variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
            <Button size="sm" variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button size="sm" className="bg-gradient-primary">
              <Plus className="h-4 w-4 mr-2" />
              New Ticket
            </Button>
          </div>
        </div>

        {/* Dashboard Stats */}
        <DashboardStats />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Tickets Column */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-border bg-card shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Recent Tickets</span>
                  <Button variant="ghost" size="sm">View All</Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <TicketList />
              </CardContent>
            </Card>
          </div>

          {/* Sidebar Column */}
          <div className="space-y-6">
            <WorkTimer />
            
            {/* Quick Stats */}
            <Card className="border-border bg-card shadow-card">
              <CardHeader>
                <CardTitle className="text-lg">Team Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <span className="text-sm">John Smith</span>
                    <div className="flex items-center space-x-2">
                      <div className="h-2 w-2 bg-success rounded-full"></div>
                      <span className="text-xs text-muted-foreground">Active</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <span className="text-sm">Sarah Wilson</span>
                    <div className="flex items-center space-x-2">
                      <div className="h-2 w-2 bg-warning rounded-full"></div>
                      <span className="text-xs text-muted-foreground">Busy</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <span className="text-sm">Mike Johnson</span>
                    <div className="flex items-center space-x-2">
                      <div className="h-2 w-2 bg-muted rounded-full"></div>
                      <span className="text-xs text-muted-foreground">Away</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </ITLayout>
  );
};

export default Index;
