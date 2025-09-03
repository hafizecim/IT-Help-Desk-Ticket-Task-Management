import { ITLayout } from "@/components/layout/ITLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Download,
  Calendar,
  BarChart3,
  TrendingUp,
  TrendingDown,
  Clock,
  Users,
  Ticket,
  CheckCircle,
  AlertTriangle
} from "lucide-react";

const kpiData = [
  {
    title: "Total Tickets",
    value: "1,247",
    change: "+12%",
    trend: "up",
    icon: Ticket
  },
  {
    title: "Resolved Tickets",
    value: "1,089",
    change: "+8%", 
    trend: "up",
    icon: CheckCircle
  },
  {
    title: "Avg Resolution Time",
    value: "4.2h",
    change: "-15%",
    trend: "up",
    icon: Clock
  },
  {
    title: "Customer Satisfaction",
    value: "94.5%",
    change: "+2%",
    trend: "up",
    icon: TrendingUp
  }
];

const slaMetrics = [
  {
    priority: "Critical",
    slaTarget: "1h",
    averageTime: "45m",
    compliance: 95,
    color: "destructive"
  },
  {
    priority: "High", 
    slaTarget: "4h",
    averageTime: "3.2h",
    compliance: 88,
    color: "warning"
  },
  {
    priority: "Medium",
    slaTarget: "24h", 
    averageTime: "18h",
    compliance: 92,
    color: "info"
  },
  {
    priority: "Low",
    slaTarget: "72h",
    averageTime: "48h",
    compliance: 98,
    color: "success"
  }
];

const teamPerformance = [
  {
    name: "John Doe",
    role: "IT Administrator", 
    tickeetsResolved: 145,
    avgResolutionTime: "3.8h",
    satisfaction: 96,
    efficiency: 94
  },
  {
    name: "Jane Smith",
    role: "IT Support Specialist",
    tickeetsResolved: 98,
    avgResolutionTime: "4.2h", 
    satisfaction: 93,
    efficiency: 91
  },
  {
    name: "Mike Johnson",
    role: "Network Administrator",
    tickeetsResolved: 67,
    avgResolutionTime: "5.1h",
    satisfaction: 89,
    efficiency: 87
  }
];

export default function Reports() {
  return (
    <ITLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Reports & Analytics
            </h1>
            <p className="text-muted-foreground mt-1">
              Performance metrics and detailed analytics
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <Button size="sm" variant="outline">
              <Calendar className="h-4 w-4 mr-2" />
              Date Range
            </Button>
            <Button size="sm" className="bg-gradient-primary">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {kpiData.map((kpi, index) => (
            <Card key={index} className="border-border bg-card shadow-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{kpi.title}</p>
                    <p className="text-2xl font-bold text-foreground">{kpi.value}</p>
                    <div className="flex items-center space-x-1 mt-1">
                      {kpi.trend === 'up' ? (
                        <TrendingUp className="h-4 w-4 text-success" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-destructive" />
                      )}
                      <span className={`text-sm font-medium ${kpi.trend === 'up' ? 'text-success' : 'text-destructive'}`}>
                        {kpi.change}
                      </span>
                    </div>
                  </div>
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <kpi.icon className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* SLA Compliance */}
          <Card className="border-border bg-card shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5 text-primary" />
                <span>SLA Compliance</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {slaMetrics.map((metric, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Badge 
                        className={`text-xs ${
                          metric.color === 'destructive' ? 'bg-destructive/20 text-destructive border-destructive/30' :
                          metric.color === 'warning' ? 'bg-warning/20 text-warning border-warning/30' :
                          metric.color === 'info' ? 'bg-info/20 text-info border-info/30' :
                          'bg-success/20 text-success border-success/30'
                        }`}
                      >
                        {metric.priority}
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        Target: {metric.slaTarget}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-medium">{metric.compliance}%</span>
                      <p className="text-xs text-muted-foreground">Avg: {metric.averageTime}</p>
                    </div>
                  </div>
                  <Progress value={metric.compliance} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Team Performance */}
          <Card className="border-border bg-card shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-primary" />
                <span>Team Performance</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {teamPerformance.map((member, index) => (
                <div key={index} className="p-4 bg-muted/30 rounded-lg border border-border">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="font-medium text-foreground">{member.name}</h4>
                      <p className="text-sm text-muted-foreground">{member.role}</p>
                    </div>
                    <Badge className="bg-primary/20 text-primary border-primary/30">
                      {member.efficiency}% Efficiency
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div className="text-center">
                      <div className="font-bold text-foreground">{member.tickeetsResolved}</div>
                      <div className="text-xs text-muted-foreground">Resolved</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-foreground">{member.avgResolutionTime}</div>
                      <div className="text-xs text-muted-foreground">Avg Time</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-success">{member.satisfaction}%</div>
                      <div className="text-xs text-muted-foreground">Satisfaction</div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Chart Placeholder */}
        <Card className="border-border bg-card shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              <span>Ticket Trends</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-muted/30 rounded-lg border border-border flex items-center justify-center">
              <div className="text-center">
                <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                <p className="text-muted-foreground">Chart visualization will be implemented here</p>
                <p className="text-sm text-muted-foreground">Integration with charting library required</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </ITLayout>
  );
}