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

const stats = [
  {
    title: "Open Tickets",
    value: "47",
    change: "+12%",
    changeType: "increase" as const,
    icon: Ticket,
    color: "primary",
    description: "vs last month"
  },
  {
    title: "In Progress",
    value: "23",
    change: "+5%",
    changeType: "increase" as const,
    icon: Clock,
    color: "warning",
    description: "Currently active"
  },
  {
    title: "Resolved Today",
    value: "18",
    change: "+8%",
    changeType: "increase" as const,
    icon: CheckCircle,
    color: "success",
    description: "Today's completions"
  },
  {
    title: "Critical Issues",
    value: "3",
    change: "-2",
    changeType: "decrease" as const,
    icon: AlertTriangle,
    color: "destructive",
    description: "High priority"
  },
  {
    title: "Team Efficiency",
    value: "94%",
    change: "+3%",
    changeType: "increase" as const,
    icon: TrendingUp,
    color: "success",
    description: "SLA compliance"
  },
  {
    title: "Active Users",
    value: "156",
    change: "+7%",
    changeType: "increase" as const,
    icon: Users,
    color: "info",
    description: "This week"
  }
];

export function DashboardStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {stats.map((stat, index) => {
        const IconComponent = stat.icon;
        
        return (
          <Card 
            key={stat.title} 
            className="relative overflow-hidden border-border bg-card shadow-card hover:shadow-glow transition-all duration-300 animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <div className={`h-8 w-8 rounded-lg flex items-center justify-center ${
                  stat.color === 'primary' ? 'bg-primary/20 text-primary' :
                  stat.color === 'success' ? 'bg-success/20 text-success' :
                  stat.color === 'warning' ? 'bg-warning/20 text-warning' :
                  stat.color === 'destructive' ? 'bg-destructive/20 text-destructive' :
                  stat.color === 'info' ? 'bg-info/20 text-info' :
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
                    {stat.value}
                  </span>
                  <Badge 
                    variant={stat.changeType === 'increase' ? 'default' : 'secondary'}
                    className={`text-xs ${
                      stat.changeType === 'increase' 
                        ? 'bg-success/20 text-success border-success/30' 
                        : 'bg-muted/20 text-muted-foreground border-border'
                    }`}
                  >
                    {stat.change}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  {stat.description}
                </p>
              </div>
            </CardContent>
            
            {/* Decorative gradient overlay */}
            <div className={`absolute top-0 right-0 w-24 h-24 opacity-10 ${
              stat.color === 'primary' ? 'bg-gradient-primary' :
              stat.color === 'success' ? 'bg-gradient-success' :
              stat.color === 'warning' ? 'bg-gradient-warning' :
              'bg-gradient-primary'
            } rounded-full -translate-y-8 translate-x-8`} />
          </Card>
        );
      })}
    </div>
  );
}