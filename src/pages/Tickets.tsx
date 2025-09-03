import { ITLayout } from "@/components/layout/ITLayout";
import { TicketList } from "@/components/tickets/TicketList";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  Filter, 
  Search,
  SortAsc,
  Download
} from "lucide-react";

export default function Tickets() {
  return (
    <ITLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Ticket Management
            </h1>
            <p className="text-muted-foreground mt-1">
              Track and manage all support tickets
            </p>
          </div>
          <div className="flex items-center space-x-3">
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

        {/* Filters & Search */}
        <Card className="border-border bg-card shadow-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Filters & Search</CardTitle>
              <div className="flex items-center space-x-2">
                <Badge variant="secondary" className="text-xs">
                  47 Total
                </Badge>
                <Badge className="bg-primary/20 text-primary border-primary/30 text-xs">
                  23 Active
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search tickets by title, ID, or assignee..." 
                  className="pl-10"
                />
              </div>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
              <Button variant="outline" size="sm">
                <SortAsc className="h-4 w-4 mr-2" />
                Sort
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Tickets List */}
        <Card className="border-border bg-card shadow-card">
          <CardHeader>
            <CardTitle className="text-lg">All Tickets</CardTitle>
          </CardHeader>
          <CardContent>
            <TicketList />
          </CardContent>
        </Card>
      </div>
    </ITLayout>
  );
}