import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Ticket, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  TrendingUp,
  Users
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import { Tables } from "@/integrations/supabase/types";

// Dashboard stat tipini al
type DashboardStatRow = Tables<"dashboard_stats">;

// ikon ve renk mapleri
const iconMap = {
  open_tickets: Ticket,
  in_progress: Clock,
  resolved_today: CheckCircle,
  critical_issues: AlertTriangle,
  team_efficiency: TrendingUp,
  active_users: Users
};

const colorMap = {
  open_tickets: "primary",
  in_progress: "warning",
  resolved_today: "success",
  critical_issues: "destructive",
  team_efficiency: "success",
  active_users: "info"
};

export function DashboardStats() {
  const [stats, setStats] = useState<DashboardStatRow[]>([]);

  useEffect(() => {
    async function fetchStats() {
      const { data, error } = await supabase
        .from("dashboard_stats")
        .select("*")
        .order("id", { ascending: true });

      if (!error && data) setStats(data);
    }

    fetchStats();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {stats.map((stat, index) => {
        const IconComponent = iconMap[stat.stat_key] || Ticket;
        const color = colorMap[stat.stat_key] || "primary";

        return (
          <Card 
            key={stat.id} 
            className="relative overflow-hidden border-border bg-card shadow-card hover:shadow-glow transition-all duration-300 animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.stat_title}
                </CardTitle>
                <div className={`h-8 w-8 rounded-lg flex items-center justify-center ${
                  color === 'primary' ? 'bg-primary/20 text-primary' :
                  color === 'success' ? 'bg-success/20 text-success' :
                  color === 'warning' ? 'bg-warning/20 text-warning' :
                  color === 'destructive' ? 'bg-destructive/20 text-destructive' :
                  color === 'info' ? 'bg-info/20 text-info' :
                  'bg-muted/20 text-muted-foreground'
                }`}>
                  <IconComponent className="h-4 w-4" />
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-baseline space-x-2">
                  <span className="text-2xl font-bold text-foreground">
                    {stat.stat_value}
                  </span>
                  <Badge 
                    variant={stat.stat_change_type === 'increase' ? 'default' : 'secondary'}
                    className={`text-xs ${
                      stat.stat_change_type === 'increase' 
                        ? 'bg-success/20 text-success border-success/30' 
                        : 'bg-muted/20 text-muted-foreground border-border'
                    }`}
                  >
                    {stat.stat_change}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  {stat.stat_description}
                </p>
              </div>
            </CardContent>
            
            {/* Decorative gradient overlay */}
            <div className={`absolute top-0 right-0 w-24 h-24 opacity-10 ${
              color === 'primary' ? 'bg-gradient-primary' :
              color === 'success' ? 'bg-gradient-success' :
              color === 'warning' ? 'bg-gradient-warning' :
              'bg-gradient-primary'
            } rounded-full -translate-y-8 translate-x-8`} />
          </Card>
        );
      })}
    </div>
  );
}
