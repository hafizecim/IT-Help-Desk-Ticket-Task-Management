import { ITLayout } from "@/components/layout/ITLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import { Database, TablesInsert } from "@/integrations/supabase/types";

type ProjectInsert = TablesInsert<"projects">;

export default function NewProject() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<"planning" | "active" | "completed">("planning");
  const [priority, setPriority] = useState<"low" | "medium" | "high" | "critical">("medium");
  const [dueDate, setDueDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    setLoading(true);
    const newProject: ProjectInsert = {
      // Eğer veritabanı id'yi otomatik oluşturuyorsa bu satırı silin
      title,
      description,
      status,
      priority,
      due_date: dueDate || null,
      total_tasks: 0,
      completed_tasks: 0,
      progress: 0
    };

    // 'insert' metoduna tipini belirtin
    const { data, error } = await supabase
      .from("projects")
      .insert([newProject]);
    
    setLoading(false);

    if (error) {
      setMessage("Error creating project: " + error.message);
    } else {
      setMessage("Project created successfully!");
    }
  };

  return (
    <ITLayout>
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold">Create New Project</h1>
        {message && <p className="text-sm text-muted-foreground">{message}</p>}

        <Card>
          <CardHeader>
            <CardTitle>Project Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium">Title</label>
              <Input value={title} onChange={e => setTitle(e.target.value)} placeholder="Project Title" />
            </div>
            <div>
              <label className="text-sm font-medium">Description</label>
              <Input value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" />
            </div>
            <div>
              <label className="text-sm font-medium">Status</label>
              <select
                className="w-full border rounded px-2 py-1"
                value={status}
                onChange={e => setStatus(e.target.value as typeof status)}
              >
                <option value="planning">Planning</option>
                <option value="active">Active</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium">Priority</label>
              <select
                className="w-full border rounded px-2 py-1"
                value={priority}
                onChange={e => setPriority(e.target.value as typeof priority)}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="critical">Critical</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium">Due Date</label>
              <Input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} />
            </div>
            <Button onClick={handleSubmit} disabled={loading} className="w-full bg-gradient-primary">
              {loading ? "Creating..." : "Create Project"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </ITLayout>
  );
}