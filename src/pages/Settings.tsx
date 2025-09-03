import { ITLayout } from "@/components/layout/ITLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Settings as SettingsIcon,
  Bell,
  Shield,
  Users,
  Mail,
  Smartphone,
  Globe,
  Database,
  Key,
  Save
} from "lucide-react";

export default function Settings() {
  return (
    <ITLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              System Settings
            </h1>
            <p className="text-muted-foreground mt-1">
              Configure system preferences and security settings
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <Button size="sm" className="bg-gradient-primary">
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Settings Navigation - Left Sidebar */}
          <div className="lg:col-span-1">
            <Card className="border-border bg-card shadow-card">
              <CardHeader>
                <CardTitle className="text-lg">Settings Categories</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {[
                  { title: "General", icon: SettingsIcon, active: true },
                  { title: "Notifications", icon: Bell, active: false },
                  { title: "Security", icon: Shield, active: false },
                  { title: "User Management", icon: Users, active: false },
                  { title: "Integrations", icon: Globe, active: false },
                  { title: "Database", icon: Database, active: false }
                ].map((item, index) => (
                  <button
                    key={index}
                    className={`w-full flex items-center space-x-3 p-3 rounded-lg border transition-colors ${
                      item.active 
                        ? 'bg-primary/10 border-primary/30 text-primary' 
                        : 'border-border hover:bg-muted/50 text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <item.icon className="h-4 w-4" />
                    <span className="text-sm font-medium">{item.title}</span>
                  </button>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Settings Content - Right Side */}
          <div className="lg:col-span-2 space-y-6">
            {/* General Settings */}
            <Card className="border-border bg-card shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <SettingsIcon className="h-5 w-5 text-primary" />
                  <span>General Settings</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="company-name">Company Name</Label>
                    <Input id="company-name" defaultValue="IT HelpDesk System" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="system-name">System Name</Label>
                    <Input id="system-name" defaultValue="HelpDesk Pro" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="system-url">System URL</Label>
                  <Input id="system-url" defaultValue="https://helpdesk.company.com" />
                </div>

                <Separator />

                <div className="space-y-4">
                  <h4 className="font-medium text-foreground">Work Timer Settings</h4>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Auto-pause inactive sessions</Label>
                      <p className="text-sm text-muted-foreground">Automatically pause work sessions after 30 minutes of inactivity</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Single active work rule</Label>
                      <p className="text-sm text-muted-foreground">Enforce only one active work session at a time</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Notification Settings */}
            <Card className="border-border bg-card shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Bell className="h-5 w-5 text-primary" />
                  <span>Notification Settings</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <Label>Email Notifications</Label>
                        <p className="text-sm text-muted-foreground">Send email notifications for ticket updates</p>
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Smartphone className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <Label>SMS Notifications</Label>
                        <p className="text-sm text-muted-foreground">Send SMS for critical tickets</p>
                      </div>
                    </div>
                    <Switch />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Bell className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <Label>SLA Reminders</Label>
                        <p className="text-sm text-muted-foreground">Alert when SLA deadline approaches</p>
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h4 className="font-medium text-foreground">Notification Timing</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="sla-warning">SLA Warning (hours before)</Label>
                      <Input id="sla-warning" type="number" defaultValue="2" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="reminder-interval">Reminder Interval (hours)</Label>
                      <Input id="reminder-interval" type="number" defaultValue="4" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Security Settings */}
            <Card className="border-border bg-card shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="h-5 w-5 text-primary" />
                  <span>Security Settings</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Two-Factor Authentication</Label>
                      <p className="text-sm text-muted-foreground">Require 2FA for all admin users</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch defaultChecked />
                      <Badge className="bg-success/20 text-success border-success/30">
                        Enabled
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Session Timeout</Label>  
                      <p className="text-sm text-muted-foreground">Auto-logout after inactivity</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Password Policy</Label>
                      <p className="text-sm text-muted-foreground">Enforce strong password requirements</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Key className="h-4 w-4 text-primary" />
                    <h4 className="font-medium text-foreground">API Security</h4>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="api-key">API Key</Label>
                    <div className="flex space-x-2">
                      <Input id="api-key" type="password" defaultValue="••••••••••••••••" className="flex-1" />
                      <Button variant="outline" size="sm">Regenerate</Button>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Rate Limiting</Label>
                      <p className="text-sm text-muted-foreground">Limit API requests per minute</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </ITLayout>
  );
}