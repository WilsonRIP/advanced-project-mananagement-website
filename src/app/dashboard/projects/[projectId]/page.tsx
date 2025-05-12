'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card'; // Use path alias
import { Loader2, AlertCircle, ListChecks, Users, Settings, Activity } from 'lucide-react'; // Added icons
import { Badge } from '../../../components/ui/badge'; // Use path alias
import { TaskDetailModal } from '../../../components/TaskDetailModal'; // Use path alias

// Define Project Type (including tasks and activity)
interface Project {
  id: number;
  name: string;
  status: "In Progress" | "Planning" | "Completed";
  tasks: Task[]; // Added
  activity: RecentActivity[]; // Added
  // Add description later?
}

// Define Task Type
interface Task {
    id: number;
    projectId: number;
    description: string;
    dueDate: string;
    status: 'To Do' | 'In Progress' | 'Done';
    priority: 'Low' | 'Medium' | 'High';
}

// Define Activity Type
interface RecentActivity {
    id: number;
    projectId: number;
    action: string;
    target: string;
    time: string;
    user: string;
}

export default function ProjectDetailPage() {
  const params = useParams();
  const projectId = params.projectId as string;

  const [project, setProject] = useState<Project | null>(null);
  // Removed separate tasks/activity state, they are part of the project object now
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // --- State for Task Detail Modal ---
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  // Renamed for clarity, wrapped in useCallback
  const fetchProjectData = useCallback(async () => {
    if (!projectId) return;
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/dashboard/projects/${projectId}`);
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`Failed to fetch project: ${response.statusText} ${errorData?.message ? `- ${errorData.message}` : ''}`);
      }
      const data: Project = await response.json();
      setProject(data);
    } catch (err: any) {
      console.error("Fetch project detail error:", err);
      setError(err.message || 'Could not load project details.');
    } finally {
      setIsLoading(false);
    }
  }, [projectId]); // Dependency: projectId

  useEffect(() => {
    fetchProjectData();
  }, [fetchProjectData]); // Dependency: fetchProjectData callback

  const handleOpenTaskModal = (task: Task) => {
    setSelectedTask(task);
    setIsTaskModalOpen(true);
  };

  const handleSaveTask = async (updatedTask: Task) => {
    console.log('Attempting to save task:', updatedTask);
    // API Call to update the task
    try {
      const response = await fetch(`/api/dashboard/tasks/${updatedTask.id}`, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedTask),
      });

      if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(`Failed to save task: ${response.statusText} ${errorData?.message ? `- ${errorData.message}` : ''}`);
      }

      // Task saved successfully, refetch project data to update the list
      console.log('Task saved successfully, refetching project data...');
      await fetchProjectData(); // Re-fetch all project data including tasks

      // Optionally, you could update the state optimistically before the fetch
      // and then reconcile after the fetch, but re-fetching is simpler for now.

    } catch (err) {
        console.error("Error saving task:", err);
        // Re-throw the error so the modal can display it
        if (err instanceof Error) {
            throw new Error(err.message || 'Could not save task.');
        } else {
             throw new Error('An unknown error occurred while saving the task.');
        }
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-10 px-4 flex justify-center items-center min-h-[calc(100vh-200px)]">
        <Loader2 className="h-8 w-8 animate-spin mr-2" /> Loading project details...
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-10 px-4 text-center text-red-600">
        <AlertCircle className="h-6 w-6 inline-block mr-2" /> Error: {error}
      </div>
    );
  }

  if (!project) {
     return (
      <div className="container mx-auto py-10 px-4 text-center text-gray-500">
        Project not found or you do not have permission to view it.
      </div>
    );
  }

  // --- Helper Functions for Badges ---
  const getStatusBadgeClass = (status: Project['status']) => {
      switch (status) {
          case 'In Progress': return 'bg-yellow-100 text-yellow-800 border-yellow-300 dark:bg-yellow-900 dark:text-yellow-300 dark:border-yellow-700';
          case 'Planning': return 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-900 dark:text-blue-300 dark:border-blue-700';
          case 'Completed': return 'bg-green-100 text-green-800 border-green-300 dark:bg-green-900 dark:text-green-300 dark:border-green-700';
          default: return 'bg-gray-100 text-gray-800 border-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600';
      }
  };

  const getTaskStatusBadgeVariant = (status: Task['status']): "default" | "secondary" | "destructive" | "outline" => {
      switch (status) {
          case 'In Progress': return 'default'; // Or maybe a specific color
          case 'To Do': return 'secondary';
          case 'Done': return 'outline';
          default: return 'secondary';
      }
  };

   const getPriorityBadgeVariant = (priority: Task['priority']): "default" | "secondary" | "destructive" | "outline" => {
      switch (priority) {
          case 'High': return 'destructive';
          case 'Medium': return 'default'; // Or maybe yellow?
          case 'Low': return 'secondary';
          default: return 'secondary';
      }
  };

  return (
    <div className="container mx-auto py-10 px-4 space-y-8">
      {/* Header Section */}
      <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold truncate mr-4">{project.name}</h1>
        <Badge variant="outline" className={`text-sm ${getStatusBadgeClass(project.status)}`}>
          {project.status}
        </Badge>
      </div>

       {/* TODO: Add Project Description Card? */}
       {/* TODO: Add Quick Stats row (Task counts?) */}

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Tasks Section */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center"><ListChecks className="mr-2 h-5 w-5"/> Tasks ({project.tasks?.length || 0})</CardTitle>
             {/* TODO: Add filtering/sorting controls? Add Task Button */}
          </CardHeader>
          <CardContent>
             {(project.tasks && project.tasks.length > 0) ? (
                 <ul className="space-y-3">
                    {project.tasks.map((task) => (
                        <li
                            key={task.id}
                            className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-3 border rounded-md hover:bg-muted/50 cursor-pointer"
                            onClick={() => handleOpenTaskModal(task)}
                        >
                           <div className="flex-grow mb-2 sm:mb-0 sm:mr-4">
                                <p className="font-medium leading-snug">{task.description}</p>
                                <p className="text-xs text-muted-foreground mt-1">Due: {task.dueDate}</p>
                            </div>
                            <div className="flex items-center space-x-2 flex-shrink-0">
                                <Badge variant={getPriorityBadgeVariant(task.priority)}>{task.priority}</Badge>
                                <Badge variant={getTaskStatusBadgeVariant(task.status)}>{task.status}</Badge>
                            </div>
                        </li>
                    ))}
                 </ul>
             ) : (
                 <p className="text-sm text-muted-foreground text-center py-4">No tasks assigned to this project yet.</p>
             )}
          </CardContent>
        </Card>

        {/* Side Panel (Activity, Members, Settings) */}
        <div className="lg:col-span-1 space-y-6">
            {/* Activity Feed Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center"><Activity className="mr-2 h-5 w-5"/> Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                 {(project.activity && project.activity.length > 0) ? (
                     <ul className="space-y-3">
                        {project.activity.map((activityItem) => (
                            <li key={activityItem.id} className="text-sm">
                                <span className="font-medium">{activityItem.user}</span> {activityItem.action} '{activityItem.target}'.
                                <span className="block text-xs text-muted-foreground mt-0.5">{activityItem.time}</span>
                            </li>
                        ))}
                     </ul>
                 ) : (
                     <p className="text-sm text-muted-foreground text-center py-4">No recent activity for this project.</p>
                 )}
              </CardContent>
            </Card>

             {/* TODO: Project Members Card */}
             {/* <Card>
                <CardHeader><CardTitle className="flex items-center"><Users className="mr-2 h-5 w-5"/> Members</CardTitle></CardHeader>
                <CardContent><p className="text-sm text-muted-foreground">Members list placeholder.</p></CardContent>
             </Card> */}

              {/* TODO: Project Settings Card */}
             {/* <Card>
                <CardHeader><CardTitle className="flex items-center"><Settings className="mr-2 h-5 w-5"/> Settings</CardTitle></CardHeader>
                <CardContent><p className="text-sm text-muted-foreground">Settings placeholder (e.g., Edit Project, Delete).</p></CardContent>
             </Card> */}
        </div>

      </div>
      {selectedTask && (
        <TaskDetailModal
            isOpen={isTaskModalOpen}
            onOpenChange={setIsTaskModalOpen}
            task={selectedTask}
            onSave={handleSaveTask}
        />
      )}
    </div>
  );
} 