import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Clock, 
  User, 
  Calendar, 
  MoreVertical,
  Play,
  Pause,
  CheckCircle
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import { Tables } from "@/integrations/supabase/types";

type TicketRow = Tables<"tickets">;

const priorityColors = {
  low: 'priority-low',
  medium: 'priority-medium', 
  high: 'priority-high',
  critical: 'priority-critical'
};

const statusColors = {
  new: 'info',
  assigned: 'warning',
  in_progress: 'primary',
  pending: 'warning', 
  resolved: 'success',
  closed: 'muted'
};

export function TicketList() {
  const [tickets, setTickets] = useState<TicketRow[]>([]);

  useEffect(() => {
    async function fetchTickets() {
      const { data, error } = await supabase
        .from("tickets")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data) setTickets(data);
    }

    fetchTickets();
  }, []);

  return (
    <div className="space-y-4">
      {tickets.map((ticket, index) => (
        <Card 
          key={ticket.id}
          className="hover:shadow-glow transition-all duration-300 animate-fade-in border-border"
          style={{ animationDelay: `${index * 150}ms` }}
        >
          <CardHeader className="pb-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <Badge 
                  variant="outline" 
                  className="font-mono text-xs px-3 py-1"
                >
                  {ticket.ticket_code}
                </Badge>
                <Badge 
                  className={`text-xs px-2 py-1 ${
                    ticket.priority === 'low' ? 'bg-success/20 text-success border-success/30' :
                    ticket.priority === 'medium' ? 'bg-warning/20 text-warning border-warning/30' :
                    ticket.priority === 'high' ? 'bg-destructive/20 text-destructive border-destructive/30' :
                    'bg-destructive/30 text-destructive border-destructive/50'
                  }`}
                >
                  {ticket.priority?.toUpperCase()}
                </Badge>
                <Badge 
                  variant="outline"
                  className={`text-xs px-2 py-1 ${
                    ticket.status === 'new' ? 'bg-info/20 text-info border-info/30' :
                    ticket.status === 'assigned' ? 'bg-warning/20 text-warning border-warning/30' :
                    ticket.status === 'in_progress' ? 'bg-primary/20 text-primary border-primary/30' :
                    ticket.status === 'resolved' ? 'bg-success/20 text-success border-success/30' :
                    'bg-muted/20 text-muted-foreground border-border'
                  }`}
                >
                  {ticket.status?.replace('_', ' ').toUpperCase()}
                </Badge>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button size="sm" variant="outline" className="h-8 w-8 p-0 border-success/30 hover:bg-success/10">
                  <Play className="h-3 w-3 text-success" />
                </Button>
                <Button size="sm" variant="outline" className="h-8 w-8 p-0 border-warning/30 hover:bg-warning/10">
                  <Pause className="h-3 w-3 text-warning" />
                </Button>
                <Button size="sm" variant="outline" className="h-8 w-8 p-0 border-primary/30 hover:bg-primary/10">
                  <CheckCircle className="h-3 w-3 text-primary" />
                </Button>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <CardTitle className="text-lg font-semibold text-foreground mt-2">
              {ticket.title}
            </CardTitle>
          </CardHeader>
          
          <CardContent>
            <p className="text-muted-foreground mb-4 text-sm">
              {ticket.description}
            </p>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Assignee:</span>
                <span className="font-medium">{ticket.assignee}</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Requester:</span>
                <span className="font-medium">{ticket.requester}</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Time spent:</span>
                <span className="font-medium">{ticket.time_spent}</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">SLA:</span>
                <span className="font-medium text-warning">
                  {ticket.sla_deadline ? new Date(ticket.sla_deadline).toLocaleDateString() : "-"}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
