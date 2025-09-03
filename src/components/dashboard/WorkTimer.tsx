import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Play, 
  Pause, 
  Square, 
  Clock,
  Timer
} from "lucide-react";

interface ActiveWork {
  id: string;
  title: string;
  type: 'ticket' | 'project';
  startTime: Date;
  totalTime: number; // in minutes
  isRunning: boolean;
}

export function WorkTimer() {
  const [activeWork, setActiveWork] = useState<ActiveWork>({
    id: "TK-001",
    title: "Laptop battery not charging",
    type: "ticket",
    startTime: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    totalTime: 135, // 2h 15m
    isRunning: true
  });

  const [currentTime, setCurrentTime] = useState(new Date());

  // Update timer every second
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const getCurrentSessionTime = () => {
    if (!activeWork.isRunning) return 0;
    const elapsed = (currentTime.getTime() - activeWork.startTime.getTime()) / (1000 * 60);
    return Math.floor(elapsed);
  };

  const handlePause = () => {
    setActiveWork(prev => ({ ...prev, isRunning: false }));
  };

  const handleResume = () => {
    setActiveWork(prev => ({ 
      ...prev, 
      isRunning: true,
      startTime: new Date()
    }));
  };

  const handleComplete = () => {
    setActiveWork(prev => ({ 
      ...prev, 
      isRunning: false,
      totalTime: prev.totalTime + getCurrentSessionTime()
    }));
  };

  return (
    <Card className="border-border bg-gradient-to-br from-card to-card/50 shadow-elegant">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <Timer className="h-5 w-5 text-primary" />
            <span>Active Work Session</span>
          </CardTitle>
          <Badge 
            variant={activeWork.isRunning ? "default" : "secondary"}
            className={activeWork.isRunning ? "bg-success/20 text-success border-success/30" : ""}
          >
            {activeWork.isRunning ? "RUNNING" : "PAUSED"}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Current Task */}
        <div className="p-4 bg-muted/30 rounded-lg border border-border">
          <div className="flex items-center justify-between mb-2">
            <Badge variant="outline" className="text-xs">
              {activeWork.id}
            </Badge>
            <Badge variant="secondary" className="text-xs">
              {activeWork.type.toUpperCase()}
            </Badge>
          </div>
          <h3 className="font-medium text-foreground">
            {activeWork.title}
          </h3>
        </div>

        {/* Time Display */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-4 bg-primary/5 rounded-lg border border-primary/20">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Clock className="h-4 w-4 text-primary" />
              <span className="text-sm text-muted-foreground">Total Time</span>
            </div>
            <div className="text-2xl font-bold text-primary">
              {formatTime(activeWork.totalTime + getCurrentSessionTime())}
            </div>
          </div>
          
          <div className="text-center p-4 bg-success/5 rounded-lg border border-success/20">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Timer className="h-4 w-4 text-success" />
              <span className="text-sm text-muted-foreground">Session Time</span>
            </div>
            <div className="text-2xl font-bold text-success">
              {formatTime(getCurrentSessionTime())}
            </div>
          </div>
        </div>

        {/* Control Buttons */}
        <div className="flex items-center justify-center space-x-4">
          {activeWork.isRunning ? (
            <Button 
              onClick={handlePause}
              className="bg-warning hover:bg-warning/90 text-warning-foreground"
            >
              <Pause className="h-4 w-4 mr-2" />
              Pause Work
            </Button>
          ) : (
            <Button 
              onClick={handleResume}
              className="bg-success hover:bg-success/90 text-success-foreground"
            >
              <Play className="h-4 w-4 mr-2" />
              Resume Work
            </Button>
          )}
          
          <Button 
            onClick={handleComplete}
            variant="outline"
            className="border-primary/30 hover:bg-primary/10"
          >
            <Square className="h-4 w-4 mr-2" />
            Complete
          </Button>
        </div>

        {/* Work Rules Notice */}
        <div className="p-3 bg-info/10 border border-info/20 rounded-lg">
          <p className="text-xs text-info">
            <strong>Work Rule:</strong> Only one task can be active at a time. 
            Pause current work before starting a new task.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

// Add React import for useEffect
// import React from "react";