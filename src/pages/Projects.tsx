import { ITLayout } from "@/components/layout/ITLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Plus, 
  Filter, 
  Search,
  SortAsc,
  Download,
  FolderOpen,
  Users,
  Calendar,
  Clock
} from "lucide-react";

const projects = [
  {
    id: "PRJ-001",
    title: "Office Network Infrastructure Upgrade",
    description: "Complete overhaul of network infrastructure for main office",
    status: "active",
    priority: "high",
    assignees: ["John Doe", "Jane Smith"],
    progress: 65,
    dueDate: "2024-09-15",
    totalTasks: 12,
    completedTasks: 8
  },
  {
    id: "PRJ-002", 
    title: "Employee Laptop Replacement Program",
    description: "Replace outdated laptops for 50+ employees",
    status: "planning",
    priority: "medium",
    assignees: ["Mike Johnson"],
    progress: 25,
    dueDate: "2024-10-01",
    totalTasks: 25,
    completedTasks: 6
  },
  {
    id: "PRJ-003",
    title: "Security System Implementation",
    description: "Deploy new security monitoring and access control systems",
    status: "active",
    priority: "critical",
    assignees: ["Sarah Wilson", "Tom Brown"],
    progress: 90,
    dueDate: "2024-09-05",
    totalTasks: 8,
    completedTasks: 7
  }
];

export default function Projects() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-success/20 text-success border-success/30';
      case 'planning': return 'bg-warning/20 text-warning border-warning/30';
      case 'completed': return 'bg-info/20 text-info border-info/30';
      default: return 'bg-muted/20 text-muted-foreground border-muted/30';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-destructive/20 text-destructive border-destructive/30';
      case 'high': return 'bg-warning/20 text-warning border-warning/30';
      case 'medium': return 'bg-info/20 text-info border-info/30';
      case 'low': return 'bg-success/20 text-success border-success/30';
      default: return 'bg-muted/20 text-muted-foreground border-muted/30';
    }
  };

  return (
    <ITLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Project Management
            </h1>
            <p className="text-muted-foreground mt-1">
              Track and manage IT projects and initiatives
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <Button size="sm" variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button size="sm" className="bg-gradient-primary">
              <Plus className="h-4 w-4 mr-2" />
              New Project
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
                  {projects.length} Total
                </Badge>
                <Badge className="bg-primary/20 text-primary border-primary/30 text-xs">
                  {projects.filter(p => p.status === 'active').length} Active
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search projects by title, ID, or assignee..." 
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

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Card key={project.id} className="border-border bg-card shadow-card hover:shadow-elegant transition-all duration-200">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="text-xs">
                    {project.id}
                  </Badge>
                  <div className="flex space-x-2">
                    <Badge className={getPriorityColor(project.priority) + " text-xs"}>
                      {project.priority.toUpperCase()}
                    </Badge>
                    <Badge className={getStatusColor(project.status) + " text-xs"}>
                      {project.status.toUpperCase()}
                    </Badge>
                  </div>
                </div>
                <CardTitle className="text-lg line-clamp-2">
                  {project.title}
                </CardTitle>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {project.description}
                </p>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Progress */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium">{project.progress}%</span>
                  </div>
                  <Progress value={project.progress} className="h-2" />
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{project.completedTasks}/{project.totalTasks} tasks</span>
                  </div>
                </div>

                {/* Project Info */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Team</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Due Date</span>
                  </div>
                  <div className="text-xs text-foreground">
                    {project.assignees.length} members
                  </div>
                  <div className="text-xs text-foreground">
                    {new Date(project.dueDate).toLocaleDateString()}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <Button variant="outline" size="sm">
                    <FolderOpen className="h-4 w-4 mr-2" />
                    View Details
                  </Button>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                      <Clock className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </ITLayout>
  );
}