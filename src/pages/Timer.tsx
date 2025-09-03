import { ITLayout } from "@/components/layout/ITLayout";
import { WorkTimer } from "@/components/dashboard/WorkTimer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Clock,
  History,
  BarChart3,
  Calendar
} from "lucide-react";

const recentWork = [
  {
    id: "TK-001",
    title: "Laptop battery not charging",
    type: "ticket",
    date: "2024-09-03",
    duration: "2h 15m",
    status: "completed"
  },
  {
    id: "PRJ-002",
    title: "Network Infrastructure Upgrade",
    type: "project", 
    date: "2024-09-02",
    duration: "4h 30m",
    status: "in-progress"
  },
  {
    id: "TK-003",
    title: "Email server maintenance",
    type: "ticket",
    date: "2024-09-02",
    duration: "1h 45m",
    status: "completed"
  }
];

const todayStats = {
  totalTime: "8h 30m",
  tasksCompleted: 3,
  averageTaskTime: "2h 50m",
  efficiency: 87
};

export default function Timer() {
  return (
    <ITLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Work Timer & Time Tracking
            </h1>
            <p className="text-muted-foreground mt-1">
              Track work sessions and monitor productivity
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <Button size="sm" variant="outline">
              <BarChart3 className="h-4 w-4 mr-2" />
              Reports
            </Button>
            <Button size="sm" className="bg-gradient-primary">
              <Calendar className="h-4 w-4 mr-2" />
              Schedule
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Active Work Timer */}
          <div className="xl:col-span-2">
            <WorkTimer />
          </div>

          {/* Today's Stats */}
          <div className="space-y-6">
            <Card className="border-border bg-card shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  <span>Today's Statistics</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-primary/5 rounded-lg border border-primary/20">
                    <div className="text-2xl font-bold text-primary">
                      {todayStats.totalTime}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Total Time
                    </div>
                  </div>
                  <div className="text-center p-3 bg-success/5 rounded-lg border border-success/20">
                    <div className="text-2xl font-bold text-success">
                      {todayStats.tasksCompleted}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Tasks Done
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Average Task Time</span>
                    <span className="font-medium">{todayStats.averageTaskTime}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Efficiency</span>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">{todayStats.efficiency}%</span>
                      <Badge className="bg-success/20 text-success border-success/30 text-xs">
                        Good
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Recent Work History */}
        <Card className="border-border bg-card shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <History className="h-5 w-5 text-primary" />
              <span>Recent Work Sessions</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentWork.map((work, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border border-border">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="text-xs">
                        {work.id}
                      </Badge>
                      <Badge 
                        variant="secondary" 
                        className={`text-xs ${work.type === 'project' ? 'bg-info/20 text-info border-info/30' : 'bg-primary/20 text-primary border-primary/30'}`}
                      >
                        {work.type.toUpperCase()}
                      </Badge>
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">{work.title}</h4>
                      <p className="text-sm text-muted-foreground">{work.date}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{work.duration}</span>
                      </div>
                    </div>
                    <Badge 
                      className={work.status === 'completed' ? 'bg-success/20 text-success border-success/30' : 'bg-warning/20 text-warning border-warning/30'}
                    >
                      {work.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </ITLayout>
  );
}