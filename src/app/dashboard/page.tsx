"use client";

import React, { useState, useMemo, useEffect, useCallback, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "../components/ui/dialog";
import {
  PlusCircle,
  Activity,
  User,
  FolderKanban,
  Search,
  Bell,
  Briefcase,
  CheckCircle,
  Clock,
  Loader2,
} from 'lucide-react';
import { authClient } from '../../lib/auth-client';
import Link from 'next/link';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../components/ui/popover";
import { cardHoverEffect, subtleButtonHover, staggerContainer, fadeInUp } from '../../lib/animations';

// Define Types
interface Project {
  id: number;
  name: string;
  status: "In Progress" | "Planning" | "Completed";
}

interface Task {
  id: number;
  projectId: number;
  description: string;
  dueDate: string;
  status: 'To Do' | 'In Progress' | 'Done';
  priority: 'Low' | 'Medium' | 'High';
}

interface RecentActivity {
    id: number;
    user: string;
    action: string;
    target: string;
    time: string;
}

export default function DashboardPage() {
  // --- Session Data ---
  const { data: session, isPending: isLoadingSession } = authClient.useSession();
  const userName = session?.user?.name || 'User';

  // --- Component State ---
  const [searchTerm, setSearchTerm] = useState('');
  const [projectSort, setProjectSort] = useState<'name' | 'status'>('name');
  const [taskFilter, setTaskFilter] = useState<'all' | 'dueSoon'>('all');
  const [isNewProjectModalOpen, setIsNewProjectModalOpen] = useState(false);
  const [isNewTaskModalOpen, setIsNewTaskModalOpen] = useState(false);

  // --- Data Fetching State ---
  const [projects, setProjects] = useState<Project[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [activity, setActivity] = useState<RecentActivity[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  // --- Form State (for modals) ---
  const [newProjectName, setNewProjectName] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  // --- Fetch Data Function (using useCallback) ---
  const fetchData = useCallback(async () => {
    setIsLoadingData(true);
    setFetchError(null);
    try {
      const [projectsRes, tasksRes, activityRes] = await Promise.all([
        fetch('/api/dashboard/projects'),
        fetch('/api/dashboard/tasks'),
        fetch('/api/dashboard/activity'),
      ]);

      if (!projectsRes.ok || !tasksRes.ok || !activityRes.ok) {
        console.error('Fetch status:', { p: projectsRes.status, t: tasksRes.status, a: activityRes.status });
        throw new Error('Failed to fetch dashboard data');
      }

      const [projectsData, tasksData, activityData] = await Promise.all([
        projectsRes.json(),
        tasksRes.json(),
        activityRes.json(),
      ]);

      setProjects(projectsData);
      setTasks(tasksData);
      setActivity(activityData);

    } catch (error: any) {
      console.error("Dashboard data fetch error:", error);
      setFetchError(error.message || 'Could not load dashboard data.');
    } finally {
      setIsLoadingData(false);
    }
  }, []); // useCallback dependency array is empty as it doesn't depend on component state

  // --- Initial Fetch Effect ---
  useEffect(() => {
    fetchData();
  }, [fetchData]); // Run fetch data when the function instance changes (only once due to useCallback)

  // --- Derived Data (Filtering & Sorting) - Now uses fetched state ---
  const filteredAndSortedProjects = useMemo(() => {
    const filtered = projects.filter(project =>
      project.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return filtered.sort((a, b) => {
      if (projectSort === 'name') {
        return a.name.localeCompare(b.name);
      } else if (projectSort === 'status') {
        // Simple status order: Planning > In Progress > Completed
        const statusOrder = { Planning: 1, "In Progress": 2, Completed: 3 };
        return statusOrder[a.status] - statusOrder[b.status];
      }
      return 0;
    });
  }, [searchTerm, projectSort, projects]);

  const filteredTasks = useMemo(() => {
    return tasks.filter(task => {
      const matchesSearch = task.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = taskFilter === 'all' || (taskFilter === 'dueSoon' && task.dueDate === 'Tomorrow'); // Simple 'dueSoon' logic
      return matchesSearch && matchesFilter;
    });
     // Could add sorting for tasks here too if needed
  }, [searchTerm, taskFilter, tasks]);

  // --- Stats (Calculated from fetched state) ---
   const stats = useMemo(() => ({
    activeProjects: projects.filter(p => p.status === 'In Progress' || p.status === 'Planning').length,
    tasksDueSoon: tasks.filter(t => t.dueDate === 'Tomorrow').length, // Specific count for 'Tomorrow'
    completedProjects: projects.filter(p => p.status === 'Completed').length,
  }), [projects, tasks]);

  // --- Form Submission Handlers ---
  const handleCreateProject = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!newProjectName.trim()) {
        setFormError('Project name cannot be empty.');
        return;
    }
    setIsSubmitting(true);
    setFormError(null);
    try {
      const response = await fetch('/api/dashboard/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newProjectName }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create project');
      }
      setNewProjectName(''); // Clear input
      setIsNewProjectModalOpen(false); // Close modal
      await fetchData(); // Refetch data
    } catch (error: any) {
      console.error("Create project error:", error);
      setFormError(error.message || 'Could not create project.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCreateTask = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
     if (!newTaskDescription.trim()) {
        setFormError('Task description cannot be empty.');
        return;
    }
    setIsSubmitting(true);
    setFormError(null);
    try {
      const response = await fetch('/api/dashboard/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description: newTaskDescription /*, dueDate: ... */ }), // Can add dueDate later
      });
       if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create task');
      }
      setNewTaskDescription(''); // Clear input
      setIsNewTaskModalOpen(false); // Close modal
      await fetchData(); // Refetch data
    } catch (error: any) {
      console.error("Create task error:", error);
      setFormError(error.message || 'Could not create task.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- Render Logic ---
  if (isLoadingSession || isLoadingData) {
    return (
        <div className="container mx-auto py-10 px-4 text-center flex justify-center items-center min-h-[calc(100vh-200px)]">
            <Loader2 className="h-8 w-8 animate-spin mr-2" /> Loading dashboard...
        </div>
    );
  }

  if (fetchError) {
      return (
          <div className="container mx-auto py-10 px-4 text-center text-red-600">
              Error: {fetchError}
          </div>
      );
  }

  return (
    <div className="container mx-auto py-10 px-4 space-y-8">
       <div className="flex justify-between items-center">
         <h1 className="text-3xl font-bold">Welcome, {userName}!</h1>
         <div className="flex items-center space-x-4">
            <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500 dark:text-gray-400" />
                <Input
                    type="search"
                    placeholder="Search projects, tasks..."
                    className="pl-10 pr-4 py-2 w-full"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  <span className="sr-only">Notifications</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium leading-none">Notifications</h4>
                    <p className="text-sm text-muted-foreground">
                      Your recent notifications will appear here.
                    </p>
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-start space-x-3 rounded-md p-2 hover:bg-accent hover:text-accent-foreground">
                        <Activity className="mt-px h-4 w-4 flex-shrink-0" />
                        <div>
                            <p className="text-sm font-medium leading-none">Feature Update</p>
                            <p className="text-xs text-muted-foreground">New dashboard features released.</p>
                        </div>
                     </div>
                      <div className="flex items-start space-x-3 rounded-md p-2 hover:bg-accent hover:text-accent-foreground">
                        <User className="mt-px h-4 w-4 flex-shrink-0" />
                        <div>
                            <p className="text-sm font-medium leading-none">Welcome!</p>
                            <p className="text-xs text-muted-foreground">Thanks for signing up.</p>
                        </div>
                     </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
            <Link href="/profile" passHref legacyBehavior>
                <Button asChild variant="outline">
                    <a>
                      <User className="mr-2 h-4 w-4" /> Profile
                    </a>
                </Button>
            </Link>
         </div>
      </div>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
              <Briefcase className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeProjects}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tasks Due Soon (Tomorrow)</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.tasksDueSoon}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed Projects (All Time)</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.completedProjects}</div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section>
         <h2 className="text-2xl font-semibold mb-4">Quick Actions</h2>
         <div className="flex space-x-4">
             <Dialog open={isNewProjectModalOpen} onOpenChange={setIsNewProjectModalOpen}>
                <DialogTrigger asChild>
                  <motion.div
                    whileHover={subtleButtonHover.whileHover}
                  >
                    <Button>
                        <PlusCircle className="mr-2 h-4 w-4" /> New Project
                    </Button>
                  </motion.div>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <form onSubmit={handleCreateProject}>
                        <DialogHeader>
                        <DialogTitle>Create New Project</DialogTitle>
                        <DialogDescription>
                            Enter the name for your new project.
                        </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="projectName" className="text-right">
                            Name
                            </Label>
                            <Input
                            id="projectName"
                            value={newProjectName}
                            onChange={(e) => setNewProjectName(e.target.value)}
                            className="col-span-3"
                            placeholder="e.g., Q4 Marketing Campaign"
                            disabled={isSubmitting}
                            />
                        </div>
                        </div>
                         {formError && (
                            <p className="text-sm text-red-600 dark:text-red-500 text-center mb-4">{formError}</p>
                        )}
                        <DialogFooter>
                           <DialogClose asChild>
                                <Button type="button" variant="ghost" disabled={isSubmitting}>Cancel</Button>
                            </DialogClose>
                            <Button type="submit" disabled={isSubmitting}>
                                {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                                Create Project
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
             </Dialog>

             <Dialog open={isNewTaskModalOpen} onOpenChange={setIsNewTaskModalOpen}>
                <DialogTrigger asChild>
                  <motion.div
                    whileHover={subtleButtonHover.whileHover}
                  >
                    <Button>
                        <PlusCircle className="mr-2 h-4 w-4" /> New Task
                    </Button>
                   </motion.div>
                </DialogTrigger>
                 <DialogContent className="sm:max-w-[425px]">
                    <form onSubmit={handleCreateTask}>
                        <DialogHeader>
                            <DialogTitle>Create New Task</DialogTitle>
                            <DialogDescription>
                                Enter the description for the new task.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="taskDescription" className="text-right">
                                Description
                                </Label>
                                <Input
                                id="taskDescription"
                                value={newTaskDescription}
                                onChange={(e) => setNewTaskDescription(e.target.value)}
                                className="col-span-3"
                                placeholder="e.g., Design homepage banner"
                                disabled={isSubmitting}
                                />
                            </div>
                            {/* TODO: Add field for Due Date */}
                        </div>
                        {formError && (
                            <p className="text-sm text-red-600 dark:text-red-500 text-center mb-4">{formError}</p>
                        )}
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button type="button" variant="ghost" disabled={isSubmitting}>Cancel</Button>
                            </DialogClose>
                            <Button type="submit" disabled={isSubmitting}>
                                {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                                Create Task
                            </Button>
                        </DialogFooter>
                    </form>
                 </DialogContent>
            </Dialog>

         </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="flex items-center"><FolderKanban className="mr-2 h-5 w-5" /> Projects ({filteredAndSortedProjects.length})</CardTitle>
              <div className="flex space-x-1">
                <Button variant={projectSort === 'name' ? 'secondary' : 'ghost'} size="sm" onClick={() => setProjectSort('name')}>Name</Button>
                <Button variant={projectSort === 'status' ? 'secondary' : 'ghost'} size="sm" onClick={() => setProjectSort('status')}>Status</Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
             {isLoadingData ? (
                 <div className="flex justify-center items-center py-10">
                    <Loader2 className="h-6 w-6 animate-spin mr-2" /> Loading projects...
                 </div>
             ) : fetchError ? (
                 <p className="text-red-600 dark:text-red-500">{fetchError}</p>
             ) : filteredAndSortedProjects.length > 0 ? (
                 <ul className="space-y-2">
                    {filteredAndSortedProjects.map((project) => (
                        <motion.li
                            key={project.id}
                            className="flex justify-between items-center p-2 border-b last:border-b-0 hover:bg-accent"
                            whileHover={cardHoverEffect.whileHover}
                        >
                            <Link href={`/dashboard/projects/${project.id}`} className="flex-grow hover:underline mr-2 truncate">
                                <span>{project.name}</span>
                            </Link>
                            <span className={`flex-shrink-0 text-xs sm:text-sm font-medium px-2 py-0.5 rounded-full ml-auto whitespace-nowrap ${
                                project.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300' :
                                project.status === 'Planning' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300' :
                                'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                            }`}>{project.status}</span>
                        </motion.li>
                    ))}
                 </ul>
             ) : (
                 <p className="text-gray-500 dark:text-gray-400">No projects match your search.</p>
             )}
          </CardContent>
        </Card>

        <Card className="lg:col-span-1">
           <CardHeader>
             <div className="flex justify-between items-center">
               <CardTitle className="flex items-center"><Activity className="mr-2 h-5 w-5" /> Tasks ({filteredTasks.length})</CardTitle>
               <div className="flex space-x-1">
                  <Button variant={taskFilter === 'all' ? 'secondary' : 'ghost'} size="sm" onClick={() => setTaskFilter('all')}>All</Button>
                  <Button variant={taskFilter === 'dueSoon' ? 'secondary' : 'ghost'} size="sm" onClick={() => setTaskFilter('dueSoon')}>Due Soon</Button>
               </div>
             </div>
           </CardHeader>
           <CardContent>
             {isLoadingData ? (
                 <div className="flex justify-center items-center py-10">
                    <Loader2 className="h-6 w-6 animate-spin mr-2" /> Loading tasks...
                 </div>
             ) : fetchError ? (
                 <p className="text-red-600 dark:text-red-500">{fetchError}</p>
             ) : filteredTasks.length > 0 ? (
                 <motion.ul
                    className="space-y-2"
                    variants={staggerContainer()}
                    initial="initial"
                    animate="animate"
                 >
                    {filteredTasks.map((task) => (
                         <motion.li
                             key={task.id}
                             className="flex justify-between items-center p-2 border-b last:border-b-0"
                             variants={fadeInUp}
                         >
                             <span>{task.description}</span>
                             <span className="text-sm text-gray-500 dark:text-gray-400">{task.dueDate}</span>
                         </motion.li>
                     ))}
                  </motion.ul>
              ) : (
                  <p className="text-gray-500 dark:text-gray-400">No tasks match your filter/search.</p>
              )}
           </CardContent>
        </Card>

        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center"><Activity className="mr-2 h-5 w-5" /> Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
             {isLoadingData ? (
                <div className="flex justify-center items-center py-10">
                    <Loader2 className="h-6 w-6 animate-spin mr-2" /> Loading activity...
                 </div>
             ) : fetchError ? (
                 <p className="text-red-600 dark:text-red-500">{fetchError}</p>
             ) : activity.length > 0 ? (
                 <motion.ul
                    className="space-y-3"
                    variants={staggerContainer(0.08)}
                    initial="initial"
                    animate="animate"
                 >
                    {activity.map((activityItem) => (
                        <motion.li
                            key={activityItem.id}
                            className="text-sm"
                            variants={fadeInUp}
                        >
                            <span className="font-medium">{activityItem.user}</span> {activityItem.action} '{activityItem.target}'.
                            <span className="block text-xs text-gray-500 dark:text-gray-400 mt-0.5">{activityItem.time}</span>
                        </motion.li>
                    ))}
                 </motion.ul>
             ) : (
                 <p className="text-gray-500 dark:text-gray-400">No recent activity.</p>
             )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 